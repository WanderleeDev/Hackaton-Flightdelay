package com.hackathon.flight_ontime.history.mapper;

import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.model.History;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring")
public interface HistoryMapper {

    @Mapping(target = "departureDate", source = "departureDate", qualifiedByName = "mapDepartureDate")
    @Mapping(target = "status", source = "delayPrediction", qualifiedByName = "mapStatus")
    HistoryResponseDto toDto(History history);

    List<HistoryResponseDto> toDtoList(List<History> historyList);

    @Named("mapDepartureDate")
    default String mapDepartureDate(OffsetDateTime value) {
        return value != null ? value.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null;
    }
    @Named("mapDepartureDate")
    default String mapDepartureDate(LocalDateTime value) {
        return value != null ? value.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null;
    }

    @Named("mapStatus")
    default String mapStatus(Integer value) {
        return value == 1 ? "delayed" : "succeeded";
    }
}
