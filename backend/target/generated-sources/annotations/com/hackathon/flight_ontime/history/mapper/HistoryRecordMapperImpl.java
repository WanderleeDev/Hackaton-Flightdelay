package com.hackathon.flight_ontime.history.mapper;

import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiBatchResponse;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-11T21:56:42-0500",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class HistoryRecordMapperImpl implements HistoryRecordMapper {

    @Override
    public HistoryResponseDto toDto(History history) {
        if ( history == null ) {
            return null;
        }

        String departureDate = null;
        String status = null;
        UUID id = null;
        String origin = null;
        String destination = null;
        String airline = null;
        Double distanceKm = null;
        Double delayProbability = null;

        departureDate = mapDepartureDate( history.getDepartureDate() );
        if ( history.getDelayPrediction() != null ) {
            status = mapStatus( history.getDelayPrediction().intValue() );
        }
        id = history.getId();
        origin = history.getOrigin();
        destination = history.getDestination();
        airline = history.getAirline();
        distanceKm = history.getDistanceKm();
        delayProbability = history.getDelayProbability();

        String atmospherics = null;

        HistoryResponseDto historyResponseDto = new HistoryResponseDto( id, status, origin, destination, departureDate, airline, distanceKm, delayProbability, atmospherics );

        return historyResponseDto;
    }

    @Override
    public List<HistoryResponseDto> toDtoList(List<History> historyList) {
        if ( historyList == null ) {
            return null;
        }

        List<HistoryResponseDto> list = new ArrayList<HistoryResponseDto>( historyList.size() );
        for ( History history : historyList ) {
            list.add( toDto( history ) );
        }

        return list;
    }

    @Override
    public History toEntity(DataResponse dataResponse, DataRequest request) {
        if ( dataResponse == null && request == null ) {
            return null;
        }

        History history = new History();

        if ( dataResponse != null ) {
            history.setDelayPrediction( dataResponse.delayPrediction() );
            history.setDelayProbability( dataResponse.delayProbability() );
        }
        if ( request != null ) {
            history.setAirline( request.airline() );
            history.setDepartureDate( request.departureDate() );
            history.setDestination( request.destination() );
            history.setDistanceKm( request.distanceKm() );
            history.setOrigin( request.origin() );
        }

        return history;
    }

    @Override
    public BatchHistoryPreviewResponseDto toBatchPreviewDto(HistoryBatch batch) {
        if ( batch == null ) {
            return null;
        }

        List<HistoryResponseDto> histories = null;
        UUID id = null;
        String batchName = null;
        Integer serialNumber = null;
        String createdAt = null;

        histories = toDtoList( batch.getHistories() );
        id = batch.getId();
        batchName = batch.getBatchName();
        serialNumber = batch.getSerialNumber();
        if ( batch.getCreatedAt() != null ) {
            createdAt = DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( batch.getCreatedAt() );
        }

        Integer total = histories != null ? histories.size() : 0;

        BatchHistoryPreviewResponseDto batchHistoryPreviewResponseDto = new BatchHistoryPreviewResponseDto( id, batchName, histories, serialNumber, total, createdAt );

        return batchHistoryPreviewResponseDto;
    }

    @Override
    public BatchHistoryResponseDto toBatchDto(HistoryBatch batch, Page<History> histories) {
        if ( batch == null && histories == null ) {
            return null;
        }

        UUID id = null;
        String batchName = null;
        Integer serialNumber = null;
        String createdAt = null;
        if ( batch != null ) {
            id = batch.getId();
            batchName = batch.getBatchName();
            serialNumber = batch.getSerialNumber();
            if ( batch.getCreatedAt() != null ) {
                createdAt = DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( batch.getCreatedAt() );
            }
        }

        Page<HistoryResponseDto> histories1 = mapHistoriesPage(histories);

        BatchHistoryResponseDto batchHistoryResponseDto = new BatchHistoryResponseDto( id, batchName, histories1, serialNumber, createdAt );

        return batchHistoryResponseDto;
    }

    @Override
    public History toEntity(FastApiBatchResponse fastApiBatchResponse) {
        if ( fastApiBatchResponse == null ) {
            return null;
        }

        History history = new History();

        history.setAirline( fastApiBatchResponse.airline() );
        if ( fastApiBatchResponse.delayPrediction() != null ) {
            history.setDelayPrediction( fastApiBatchResponse.delayPrediction().doubleValue() );
        }
        history.setDelayProbability( fastApiBatchResponse.delayProbability() );
        history.setDepartureDate( fastApiBatchResponse.departureDate() );
        history.setDestination( fastApiBatchResponse.destination() );
        history.setDistanceKm( fastApiBatchResponse.distanceKm() );
        history.setOrigin( fastApiBatchResponse.origin() );

        return history;
    }

    @Override
    public History toEntity(FastApiBatchResponse fastApiBatchResponse, UUID batchId) {
        if ( fastApiBatchResponse == null && batchId == null ) {
            return null;
        }

        History history = new History();

        if ( fastApiBatchResponse != null ) {
            history.setAirline( fastApiBatchResponse.airline() );
            if ( fastApiBatchResponse.delayPrediction() != null ) {
                history.setDelayPrediction( fastApiBatchResponse.delayPrediction().doubleValue() );
            }
            history.setDelayProbability( fastApiBatchResponse.delayProbability() );
            history.setDepartureDate( fastApiBatchResponse.departureDate() );
            history.setDestination( fastApiBatchResponse.destination() );
            history.setDistanceKm( fastApiBatchResponse.distanceKm() );
            history.setOrigin( fastApiBatchResponse.origin() );
        }

        return history;
    }

    @Override
    public HistoryBatch toEntity(FastApiBatchResponse fastApiResponse, String batchName) {
        if ( fastApiResponse == null && batchName == null ) {
            return null;
        }

        HistoryBatch historyBatch = new HistoryBatch();

        historyBatch.setBatchName( batchName );

        return historyBatch;
    }
}
