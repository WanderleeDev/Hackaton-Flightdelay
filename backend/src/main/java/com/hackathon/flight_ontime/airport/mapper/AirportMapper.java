package com.hackathon.flight_ontime.airport.mapper;

import com.hackathon.flight_ontime.airport.dto.AirportResponseDto;
import com.hackathon.flight_ontime.airport.model.Airport;
import org.springframework.stereotype.Component;

@Component
public class AirportMapper {

    public AirportResponseDto entityToDto(Airport airport) {
        return new AirportResponseDto(
                airport.getId(),
                airport.getName(),
                airport.getIata(),
                new AirportResponseDto.Coordinates(airport.getLatitude(), airport.getLongitude())
        );
    }
}
