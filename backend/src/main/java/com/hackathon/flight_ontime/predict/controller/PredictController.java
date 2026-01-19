package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.service.PredictService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Predict Controller", description = "Delay prediction endpoint")
@AllArgsConstructor
public class PredictController {
    private PredictService predictService;

    @PostMapping("/predict")
    public ResponseEntity<DataResponse> predictionResult(@RequestBody @Valid DataRequest request){
        DataResponse prediction = predictService.getPrediction(request);
        return ResponseEntity.ok().body(prediction);
    }
}
