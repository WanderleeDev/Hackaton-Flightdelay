package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import org.springframework.stereotype.Service;

@Service
public class FlightInputService {

    public DataRequest getInput(DataRequest request){
        return new DataRequest(
                request.airline(),
                request.origin(),
                request.destination(),
                request.departureDate(),
                request.distanceKm()
        );
    }
}
