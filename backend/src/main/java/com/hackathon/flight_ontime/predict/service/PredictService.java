package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.mapper.HistoryRecordMapper;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.history.repository.IBatchHistoryRepository;
import com.hackathon.flight_ontime.history.repository.IHistoryRepository;
import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiRequest;
import com.hackathon.flight_ontime.predict.mapper.PredictMapper;
import com.hackathon.flight_ontime.predict.repository.IPredictRepository;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.hackathon.flight_ontime.predict.DTO.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA;

@Service
@AllArgsConstructor
public class PredictService {

    private final RestClient fastApiRestClient;
    private final IPredictRepository repository;
    @Autowired
    private final HistoryRecordMapper historyRecordMapper;
    @Autowired
    private final IHistoryRepository historyRepository;
    @Autowired
    private final IBatchHistoryRepository batchRepository;
    @Autowired
    private final IBatchHistoryRepository batchHistoryRepository;
    @Autowired
    private final PredictMapper predictMapper;
    @Autowired
    private final CsvService csvService;
    @Autowired
    private final EntityManager entityManager;

    @Transactional
    public DataResponse getPredictionAndSave(DataRequest request){
        FastApiRequest fastApiRequest = convertToFastApiRequest(request);

        ResponseEntity<DataResponse> requestResponseEntity = fastApiRestClient
                .post()
                .uri("/predict")
                .body(fastApiRequest)
                .retrieve()
                .toEntity(DataResponse.class);

        DataResponse response = requestResponseEntity.getBody();

        History entity = historyRecordMapper.toEntity(response, request);
        historyRepository.save(entity);
        return response;
    }

    public FastApiRequest convertToFastApiRequest(DataRequest request) {
        return new FastApiRequest(
                request.airline(),
                request.origin(),
                request.destination(),
                request.distanceKm(),
                request.departureDate().getDayOfWeek().getValue() % 7,
                request.departureDate().getHour());
    }

    @Transactional
    public BatchHistoryPreviewResponseDto processBatchPredictionsEx(MultipartFile file, String batchName) {
        csvService.validateCsv(file);
        byte[] enrichedCsvBytes = csvService.enrichCsv(file);

        Resource fileResource = new ByteArrayResource(enrichedCsvBytes) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);

        ResponseEntity<List<FastApiBatchResponse>> response = fastApiRestClient
                .post()
                .uri("/predict/batch")
                .contentType(MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<FastApiBatchResponse>>() {});
        List<FastApiBatchResponse> predictions = response.getBody();

        HistoryBatch batch = new HistoryBatch();
        batch.setBatchName(batchName);
        HistoryBatch batchSaved = batchRepository.save(batch);

        List<History> histories = historyRecordMapper.toEntityList(predictions);
        histories.forEach(history -> history.setBatch(batchSaved));
        historyRepository.saveAll(histories);
        historyRepository.flush();
        entityManager.clear();

        HistoryBatch batchWithGeneratedFields = batchRepository.findByIdWithHistories(batchSaved.getId())
                .orElseThrow(() -> new RuntimeException("Batch not found after save"));

        System.out.println(batchWithGeneratedFields);

        return historyRecordMapper.toBatchPreviewDto(batchWithGeneratedFields);
    }



}
