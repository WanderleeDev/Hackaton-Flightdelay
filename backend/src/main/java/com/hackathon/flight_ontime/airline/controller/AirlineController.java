package com.hackathon.flight_ontime.airline.controller;

import com.hackathon.flight_ontime.airline.dto.AirlineResponseDto;
import com.hackathon.flight_ontime.airline.service.IAirlineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/airlines")
@RequiredArgsConstructor()
public class AirlineController {

    private final IAirlineService airlineService;

    @GetMapping("/origin")
    public ResponseEntity<List<AirlineResponseDto>> getAllOrigins() {
        return ResponseEntity.ok().body(airlineService.getAllOrigins());
    }

    @GetMapping("/origin/{origin}")
    public ResponseEntity<List<AirlineResponseDto>> getDestiniesByOrigin(
            @PathVariable String origin
    ) {
        return ResponseEntity.ok().body(airlineService.getDestinyFromOrigin(origin));
    }
}
