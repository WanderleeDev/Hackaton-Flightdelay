package com.hackathon.flight_ontime.airline.mapper;

import com.hackathon.flight_ontime.airline.dto.AirlineResponseDto;
import com.hackathon.flight_ontime.airline.model.Airline;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AirlineMapper {

    AirlineMapper INSTANCE = Mappers.getMapper(AirlineMapper.class);

    AirlineResponseDto entityToDto(Airline airline);

    List<AirlineResponseDto> toDtoList(List<Airline> airlines);
}
