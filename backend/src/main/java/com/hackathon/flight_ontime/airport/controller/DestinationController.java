package com.hackathon.flight_ontime.airport.controller;

import com.hackathon.flight_ontime.airport.dto.AirportResponseDto;
import com.hackathon.flight_ontime.airport.service.AirportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DestinationController {

    private final AirportService airportService;

    @GetMapping("/destination/{iata}")
    public ResponseEntity<List<AirportResponseDto>> getDestinations(@PathVariable String iata) {
        return ResponseEntity.ok(airportService.getDestinationsByOrigin(iata));
    }
}
