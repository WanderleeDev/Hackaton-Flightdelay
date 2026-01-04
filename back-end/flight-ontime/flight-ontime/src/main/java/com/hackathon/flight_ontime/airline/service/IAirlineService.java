package com.hackathon.flight_ontime.airline.service;

import com.hackathon.flight_ontime.airline.dto.AirlineResponseDto;

import java.util.List;

public interface IAirlineService {

    public List<AirlineResponseDto> getAllOrigins();

    public List<AirlineResponseDto> getDestinyFromOrigin(String origin);

}
