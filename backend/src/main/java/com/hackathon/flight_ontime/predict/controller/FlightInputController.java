package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.service.FlightInputService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
@Tag(name = "Flight Input", description = "Flight ingestion endpoint")
@AllArgsConstructor
public class FlightInputController {

    private FlightInputService flightInputService;

    @PostMapping("/flight/input")
    public ResponseEntity<DataRequest> inputClient(@RequestBody @Valid DataRequest request){
        DataRequest input = flightInputService.getInput(request);
        return ResponseEntity.ok().body(input);
    }
}
