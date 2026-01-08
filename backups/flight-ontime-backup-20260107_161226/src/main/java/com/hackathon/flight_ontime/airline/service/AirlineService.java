package com.hackathon.flight_ontime.airline.service;

import com.hackathon.flight_ontime.airline.dto.AirlineResponseDto;
import com.hackathon.flight_ontime.airline.mapper.AirlineMapper;
import com.hackathon.flight_ontime.airline.repository.IAirlineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AirlineService implements  IAirlineService {

    private final IAirlineRepository repository;
    private final AirlineMapper Mapper;

    @Override
    public List<AirlineResponseDto> getAllOrigins() {
        return repository.findAll()
                .stream()
                .map(Mapper::entityToDto)
                .toList();
    }

    @Override
    public List<AirlineResponseDto> getDestinyFromOrigin(String origin) {
        return repository.findAirlinesByCode(origin)
                .stream()
                .map(Mapper::entityToDto)
                .toList();
    }
}
