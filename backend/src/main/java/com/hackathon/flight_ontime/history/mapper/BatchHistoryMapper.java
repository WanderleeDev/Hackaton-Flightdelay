package com.hackathon.flight_ontime.history.mapper;

import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.predict.DTO.FastApiBatchResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BatchHistoryMapper {

    HistoryBatch toEntity(FastApiBatchResponse fastApiResponse, String BatchName);

}
