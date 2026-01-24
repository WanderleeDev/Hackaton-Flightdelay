package com.hackathon.flight_ontime.history.mapper;

import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiBatchResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface HistoryRecordMapper {

    @Mapping(target = "departureDate", source = "departureDate", qualifiedByName = "mapDepartureDate")
    @Mapping(target = "status", source = "delayPrediction", qualifiedByName = "mapStatus")
    HistoryResponseDto toDto(History history);

    @Named("mapHistories")
    List<HistoryResponseDto> toDtoList(List<History> historyList);

    History toEntity(DataResponse dataResponse, DataRequest request);

    @Mapping(target = "total", expression = "java(histories != null ? histories.size() : 0)")
    @Mapping(target = "histories", source = "histories", qualifiedByName = "mapHistories")
    BatchHistoryResponseDto toBatchDto(HistoryBatch batch);

    @Mapping(target = "id", ignore = true)
    History toEntity(FastApiBatchResponse fastApiBatchResponse);

    @Mapping(target = "id", ignore = true)
    History toEntity(FastApiBatchResponse fastApiBatchResponse, UUID batchId);


   default  List<History> toEntityList(List<FastApiBatchResponse> fastApiBatchResponses) {
        if (fastApiBatchResponses == null || fastApiBatchResponses.isEmpty()) {
            return null;
        }

        return fastApiBatchResponses.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }


    @Mapping(target = "batchName", source = "batchName")
    @Mapping(target = "serialNumber", ignore = true)
    HistoryBatch toEntity(FastApiBatchResponse fastApiResponse, String batchName);


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
