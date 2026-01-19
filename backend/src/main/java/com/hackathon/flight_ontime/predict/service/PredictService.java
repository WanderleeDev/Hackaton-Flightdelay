package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiRequest;
import com.hackathon.flight_ontime.predict.mapper.PredictMapper;
import com.hackathon.flight_ontime.predict.model.PredictEntity;
import com.hackathon.flight_ontime.predict.repository.IPredictRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

@Service
@AllArgsConstructor
public class PredictService {

    private final RestClient fastApiRestClient;
    @Autowired
    private final IPredictRepository repository;
    private final PredictMapper predictMapper;

    @Transactional
    public DataResponse getPredictionAndSave(DataRequest request){
        FastApiRequest fastApiRequest = convertToFastApiRequest(request);

        ResponseEntity<DataResponse> requestResponseEntity = fastApiRestClient
                .post()
                .uri("/predict")
                .body(fastApiRequest)
                .retrieve()
                .toEntity(DataResponse.class);

        DataResponse response = requestResponseEntity.getBody();

        System.out.println(response);

        PredictEntity entity = predictMapper.toEntity(request, response);
        repository.save(entity);
        return response;
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
