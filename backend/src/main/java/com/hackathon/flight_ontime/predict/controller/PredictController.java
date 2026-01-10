package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.service.PredictService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PredictController {
    private PredictService predictService;

    @PostMapping("/predict")
    public ResponseEntity<DataResponse> predictionResult(@RequestBody DataRequest request){
        DataResponse prediction = predictService.getPrediction(request);
        return ResponseEntity.ok().body(prediction);
    }
}
