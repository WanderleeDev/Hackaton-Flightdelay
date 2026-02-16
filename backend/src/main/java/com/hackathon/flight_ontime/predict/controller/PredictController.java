package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.mapper.HistoryRecordMapper;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.predict.dto.FlightPredictionRequest;
import com.hackathon.flight_ontime.predict.service.PredictService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/predict")
@RequiredArgsConstructor
public class PredictController implements PredictApi {
    private final PredictService predictService;
    private final HistoryRecordMapper historyRecordMapper;

    @PostMapping
    @Override
    public ResponseEntity<HistoryResponseDto> predictFlightDelay(@Valid @RequestBody FlightPredictionRequest request) {
        History history = predictService.predict(request);
        return ResponseEntity.ok(historyRecordMapper.toDto(history));
    }

    @PostMapping(value = "/batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Override
    public ResponseEntity<BatchHistoryPreviewResponseDto> predictBatchFlightDelays(
            @RequestParam("file") MultipartFile file,
            @RequestParam("batchName") String batchName
    ) {
        HistoryBatch batch = predictService.processBatchPredictions(file, batchName);
        return ResponseEntity.ok(historyRecordMapper.toBatchPreviewDto(batch));
    }
}
