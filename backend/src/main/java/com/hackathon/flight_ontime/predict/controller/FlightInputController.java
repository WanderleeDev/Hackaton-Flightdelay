package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.service.FlightInputService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class FlightInputController {

    private FlightInputService flightInputService;

    @PostMapping("/flight/input")
    public ResponseEntity<DataRequest> inputClient(@RequestBody DataRequest request){
        DataRequest input = flightInputService.getInput(request);
        return ResponseEntity.ok().body(input);
    }
}
