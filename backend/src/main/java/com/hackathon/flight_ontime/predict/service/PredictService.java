package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiRequest;
import org.springframework.stereotype.Service;

@Service
public class PredictService {

    public DataResponse getPrediction(DataRequest request){
        FastApiRequest fastApiRequest = convertToFastApiRequest(request);

        Double probability = 0.55;
        String forecast = "Delayed";
        return new DataResponse(probability, forecast);
    }

    public FastApiRequest convertToFastApiRequest(DataRequest request) {
        return new FastApiRequest(
                request.airline(),
                request.origin(),
                request.destination(),
                request.departureDate(),
                request.distanceKm()
        );
    }
}
