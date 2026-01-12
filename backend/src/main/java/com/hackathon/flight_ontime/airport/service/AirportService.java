package com.hackathon.flight_ontime.airport.service;

import com.hackathon.flight_ontime.airport.dto.AirportResponseDto;
import com.hackathon.flight_ontime.airport.mapper.AirportMapper;
import com.hackathon.flight_ontime.airport.model.Airport;
import com.hackathon.flight_ontime.airport.repository.AirportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AirportService {

    private final AirportRepository airportRepository;
    private final AirportMapper airportMapper;
    public List<AirportResponseDto> getDestinationsByOrigin(String originIata) {
        List<Airport> destinations = airportRepository.findDestinationsByOriginIata(originIata);

        return destinations.stream()
                .map(airportMapper::entityToDto)
                .collect(Collectors.toList());
    }
}
