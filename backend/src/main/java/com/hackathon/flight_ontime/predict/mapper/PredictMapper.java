package com.hackathon.flight_ontime.predict.mapper;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.model.PredictEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Getter
@Setter
public class PredictMapper {

    public PredictEntity toEntity(DataRequest request, DataResponse response){

        if(request == null || response == null){
            return null;
        }

        PredictEntity entity = new PredictEntity();

        entity.setAirline(request.airline());
        entity.setOrigin(request.origin());
        entity.setDestination(request.destination());
        entity.setDepartureDate(request.departureDate());
        entity.setDistanceKm(request.distanceKm());
        entity.setDelayPrediction(response.delayPrediction());
        entity.setDelayProbability(response.delayProbability());

        return entity;
    }
}
