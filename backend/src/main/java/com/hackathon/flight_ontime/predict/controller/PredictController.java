package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.predict.DTO.BatchPredictionResponse;
import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.service.PredictService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
public class PredictController {
    private PredictService predictService;

    @PostMapping("/predict")
    public ResponseEntity<DataResponse> predictionResult(@RequestBody DataRequest request) {
        DataResponse prediction = predictService.getPrediction(request);
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
}
