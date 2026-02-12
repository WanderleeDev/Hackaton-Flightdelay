package com.hackathon.flight_ontime.history.mapper;

import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.predict.DTO.FastApiBatchResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-11T21:56:41-0500",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class BatchHistoryMapperImpl implements BatchHistoryMapper {

    @Override
    public HistoryBatch toEntity(FastApiBatchResponse fastApiResponse, String BatchName) {
        if ( fastApiResponse == null && BatchName == null ) {
            return null;
        }

        HistoryBatch historyBatch = new HistoryBatch();

        return historyBatch;
    }
}
