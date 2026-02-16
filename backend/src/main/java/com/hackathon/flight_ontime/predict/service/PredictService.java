package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.history.mapper.HistoryRecordMapper;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.history.repository.IBatchHistoryRepository;
import com.hackathon.flight_ontime.history.repository.IHistoryRepository;
import com.hackathon.flight_ontime.predict.dto.FastApiPredictionResponse;
import com.hackathon.flight_ontime.predict.dto.FlightPredictionRequest;
import com.hackathon.flight_ontime.predict.dto.FastApiBatchResponse;
import com.hackathon.flight_ontime.predict.dto.FastApiRequest;
import com.hackathon.flight_ontime.predict.client.FastApiClient;
import com.hackathon.flight_ontime.predict.mapper.FastApiMapper;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PredictService {

    private final FastApiClient fastApiClient;
    private final HistoryRecordMapper historyRecordMapper;
    private final IHistoryRepository historyRepository;
    private final IBatchHistoryRepository batchRepository;
    private final CsvService csvService;
    private final EntityManager entityManager;
    private final FastApiMapper fastApiMapper;

    @Transactional
    public History predict(FlightPredictionRequest request){
        log.info("Processing flight prediction: {} -> {} on {}",
                request.origin(), request.destination(), request.departureDate());
        
        FastApiRequest apiRequest = fastApiMapper.toRequest(request);
        FastApiPredictionResponse apiResponse = fastApiClient.predictSingle(apiRequest);
        History history = historyRecordMapper.toEntity(apiResponse, request);
        History saved = historyRepository.save(history);
        
        log.info("Prediction completed: id={}, probability={}, prediction={}", 
                saved.getId(), saved.getDelayProbability(), saved.getDelayPrediction());
        
        return saved;
    }


    @Transactional
    public HistoryBatch processBatchPredictions(MultipartFile file, String batchName) {
        log.info("Processing batch prediction: name={}, file={}, size={} bytes", 
                batchName, file.getOriginalFilename(), file.getSize());
        
        csvService.validateCsv(file);
        byte[] enrichedCsvBytes = csvService.enrichCsv(file);

        List<FastApiBatchResponse> predictions = fastApiClient.predictBatch(
                enrichedCsvBytes,
                file.getOriginalFilename()
        );
        
        log.debug("Received {} predictions from FastAPI", predictions.size());

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

        log.info("Batch prediction completed: batchId={}, serialNumber={}, totalRecords={}", 
                batchWithGeneratedFields.getId(), 
                batchWithGeneratedFields.getSerialNumber(),
                histories.size());

        return batchWithGeneratedFields;
    }
}
