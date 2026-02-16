package com.hackathon.flight_ontime.predict.mapper;

import com.hackathon.flight_ontime.predict.dto.FastApiRequest;
import com.hackathon.flight_ontime.predict.dto.FlightPredictionRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.OffsetDateTime;

@Mapper(componentModel = "spring")
public interface FastApiMapper {
    @Mapping(target = "dayOfWeek", source = "departureDate", qualifiedByName = "mapDayOfWeek")
    @Mapping(target = "hour", source = "departureDate.hour")
    FastApiRequest toRequest(FlightPredictionRequest request);

    @Named("mapDayOfWeek")
    default int mapDayOfWeek(OffsetDateTime value) {
        return value != null ? value.getDayOfWeek().getValue() % 7 : 0;
    }
}
