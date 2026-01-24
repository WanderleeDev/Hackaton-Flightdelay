package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.predict.DTO.BatchPredictionResponse;
import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.service.PredictService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@Tag(name = "Predict Controller", description = "Delay prediction endpoint")
@AllArgsConstructor
public class PredictController {
    private PredictService predictService;

    @PostMapping("/predict")
    public ResponseEntity<DataResponse> predictionResult(@RequestBody @Valid DataRequest request){
        DataResponse prediction = predictService.getPredictionAndSave(request);
        return ResponseEntity.ok().body(prediction);
    }

    @PostMapping(value = "/predict/batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BatchPredictionResponse> batchPrediction(@RequestParam("file") MultipartFile file) {
        // Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Validate file type
        String contentType = file.getContentType();
        String filename = file.getOriginalFilename();
        if ((contentType == null || !contentType.equals("text/csv")) &&
                (filename == null || !filename.endsWith(".csv"))) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
        }

        // Process batch predictions
        BatchPredictionResponse response = predictService.processBatchPredictions(file);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(value = "/predict/batchEx", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BatchHistoryResponseDto> batchPredictionEx(
            @RequestParam("file") MultipartFile file,
            @RequestParam("batchName") String batchName
    ) {
        var batchPredictionsResult = predictService.processBatchPredictionsEx(file, batchName);
        return ResponseEntity.ok().body(batchPredictionsResult);
    }
}
