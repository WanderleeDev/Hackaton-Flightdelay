package com.hackathon.flight_ontime.predict.client;

import com.hackathon.flight_ontime.predict.dto.FastApiPredictionResponse;
import com.hackathon.flight_ontime.predict.dto.FastApiBatchResponse;
import com.hackathon.flight_ontime.predict.dto.FastApiRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.function.Supplier;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA;

@Service
@RequiredArgsConstructor
@Slf4j
public class FastApiClient {
    private final RestClient fastApiRestClient;

    public FastApiPredictionResponse predictSingle(FastApiRequest request) {
        log.debug("Calling FastAPI for single prediction: {}", request);
        return executeWithErrorHandling(() -> fastApiRestClient
                .post()
                .uri("/predict")
                .body(request)
                .retrieve()
                .body(FastApiPredictionResponse.class));
    }

    public List<FastApiBatchResponse> predictBatch(byte[] csvBytes, String filename) {
        log.debug("Calling FastAPI for batch prediction: {}", filename);
        
        Resource fileResource = new ByteArrayResource(csvBytes) {
            @Override
            public String getFilename() {
                return filename;
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);

        return executeWithErrorHandling(() -> fastApiRestClient
                .post()
                .uri("/predict/batch")
                .contentType(MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                }));
    }

    private <T> T executeWithErrorHandling(Supplier<T> apiCall) {
        try {
            return apiCall.get();
        } catch (HttpClientErrorException e) {
            log.error("FastAPI validation error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new IllegalArgumentException("Invalid request: " + e.getResponseBodyAsString(), e);
        } catch (HttpServerErrorException e) {
            log.error("FastAPI internal error: {}", e.getStatusCode());
            throw new RuntimeException("Prediction service error", e);
        } catch (ResourceAccessException e) {
            log.error("FastAPI unavailable: {}", e.getMessage());
            throw new RuntimeException("Prediction service unavailable", e);
        }
    }
}
