package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiRequest;

public class PredictService {

    public static DataResponse getPrediction(DataRequest request){
        FastApiRequest fastApiRequest = convertToFastApiRequest(request);

        Double probability = 0.55;
        String forecast = "Delayed";
        return new DataResponse(probability, forecast);
    }

    public static FastApiRequest convertToFastApiRequest(DataRequest request) {
        return new FastApiRequest(
                request.airline(),
                request.origin(),
                request.destination(),
                request.departureDate(),
                request.distanceKm()
        );
    }
}
