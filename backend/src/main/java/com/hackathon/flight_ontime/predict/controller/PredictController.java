package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.service.PredictService;
import lombok.AllArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/predict")
@Tag(name = "Predict Controller", description = "Delay prediction endpoint")
@AllArgsConstructor
public class PredictController {
    private PredictService predictService;

    @PostMapping("")
    public ResponseEntity<DataResponse> predictionResult(@RequestBody @Valid DataRequest request){
        DataResponse prediction = predictService.getPredictionAndSave(request);
        return ResponseEntity.ok().body(prediction);
    }

    @PostMapping(value = "/batchEx", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BatchHistoryPreviewResponseDto> batchPredictionEx(
            @RequestParam("file") MultipartFile file,
            @RequestParam("batchName") String batchName
    ) {
        var batchPredictionsResult = predictService.processBatchPredictionsEx(file, batchName);
        return ResponseEntity.ok().body(batchPredictionsResult);
    }
}
