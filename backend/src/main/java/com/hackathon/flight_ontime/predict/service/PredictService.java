package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@AllArgsConstructor
public class PredictService {

    private RestClient fastApiRestClient;

    public DataResponse getPrediction(DataRequest request){
        FastApiRequest fastApiRequest = convertToFastApiRequest(request);

        ResponseEntity<DataResponse> requestResponseEntity = fastApiRestClient
                .post()
                .uri("/predict")
                .body(fastApiRequest)
                .retrieve()
                .toEntity(DataResponse.class);
        return requestResponseEntity.getBody();
    }

    public FastApiRequest convertToFastApiRequest(DataRequest request) {
        return new FastApiRequest(
                request.airline(),
                request.origin(),
                request.destination(),
                request.distanceKm(),
                request.departureDate().getDayOfWeek().getValue() % 7,
                request.departureDate().getHour()
        );
    }
}
