package com.hackathon.flight_ontime.airline.mapper;

import com.hackathon.flight_ontime.airline.dto.AirlineResponseDto;
import com.hackathon.flight_ontime.airline.model.Airline;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-11T21:56:41-0500",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class AirlineMapperImpl implements AirlineMapper {

    @Override
    public AirlineResponseDto entityToDto(Airline airline) {
        if ( airline == null ) {
            return null;
        }

        String id = null;
        String name = null;
        String code = null;

        if ( airline.getId() != null ) {
            id = airline.getId().toString();
        }
        name = airline.getName();
        code = airline.getCode();

        AirlineResponseDto airlineResponseDto = new AirlineResponseDto( id, name, code );

        return airlineResponseDto;
    }

    @Override
    public List<AirlineResponseDto> toDtoList(List<Airline> airlines) {
        if ( airlines == null ) {
            return null;
        }

        List<AirlineResponseDto> list = new ArrayList<AirlineResponseDto>( airlines.size() );
        for ( Airline airline : airlines ) {
            list.add( entityToDto( airline ) );
        }

        return list;
    }
}
