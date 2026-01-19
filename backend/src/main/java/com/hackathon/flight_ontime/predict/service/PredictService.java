package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.predict.DTO.DataRequest;
import com.hackathon.flight_ontime.predict.DTO.DataResponse;
import com.hackathon.flight_ontime.predict.DTO.FastApiRequest;
import com.hackathon.flight_ontime.predict.mapper.PredictMapper;
import com.hackathon.flight_ontime.predict.model.PredictEntity;
import com.hackathon.flight_ontime.predict.repository.IPredictRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.hackathon.flight_ontime.predict.DTO.*;
import lombok.AllArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PredictService {

    private final RestClient fastApiRestClient;
    @Autowired
    private final IPredictRepository repository;
    private final PredictMapper predictMapper;
    private static final int MAX_BATCH_SIZE = 100;

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
                request.departureDate().getHour());
    }

    public BatchPredictionResponse processBatchPredictions(MultipartFile file) {
        List<FlightPredictionItem> predictions = new ArrayList<>();
        int successCount = 0;
        int errorCount = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                        .builder()
                        .setHeader("airline", "origin", "destination", "departureDate", "distanceKm")
                        .setSkipHeaderRecord(true)
                        .setIgnoreEmptyLines(true)
                        .setTrim(true)
                        .build())) {

            int rowCount = 0;
            for (CSVRecord record : csvParser) {
                rowCount++;

                // Enforce max batch size
                if (rowCount > MAX_BATCH_SIZE) {
                    predictions.add(FlightPredictionItem.withError(
                            null, null, null, null, null,
                            "Batch size exceeds maximum of " + MAX_BATCH_SIZE + " flights"));
                    errorCount++;
                    break;
                }

                try {
                    // Parse CSV record
                    String airline = record.get("airline");
                    String origin = record.get("origin");
                    String destination = record.get("destination");
                    String departureDateStr = record.get("departureDate");
                    String distanceKmStr = record.get("distanceKm");

                    // Validate required fields
                    if (airline == null || airline.trim().isEmpty() ||
                            origin == null || origin.trim().isEmpty() ||
                            destination == null || destination.trim().isEmpty()) {
                        predictions.add(FlightPredictionItem.withError(
                                airline, origin, destination, null, null,
                                "Missing required fields (airline, origin, or destination)"));
                        errorCount++;
                        continue;
                    }

                    // Parse date
                    OffsetDateTime departureDate = null;
                    if (departureDateStr != null && !departureDateStr.trim().isEmpty()) {
                        try {
                            departureDate = OffsetDateTime.parse(departureDateStr);
                        } catch (DateTimeParseException e) {
                            predictions.add(FlightPredictionItem.withError(
                                    airline, origin, destination, null, null,
                                    "Invalid date format: " + departureDateStr));
                            errorCount++;
                            continue;
                        }
                    }

                    // Parse distance
                    Double distanceKm = null;
                    if (distanceKmStr != null && !distanceKmStr.trim().isEmpty()) {
                        try {
                            distanceKm = Double.parseDouble(distanceKmStr);
                        } catch (NumberFormatException e) {
                            predictions.add(FlightPredictionItem.withError(
                                    airline, origin, destination, departureDate, null,
                                    "Invalid distance format: " + distanceKmStr));
                            errorCount++;
                            continue;
                        }
                    }

                    // Create request and get prediction
                    DataRequest dataRequest = new DataRequest(
                            airline, origin, destination, departureDate, distanceKm);

                    DataResponse prediction = getPrediction(dataRequest);

                    // Map prediction to forecast string
                    String forecast = (prediction.delayPrediction() != null && prediction.delayPrediction() > 0.5)
                            ? "Delayed"
                            : "On Time";

                    predictions.add(new FlightPredictionItem(
                            airline, origin, destination, departureDate, distanceKm,
                            prediction.delayProbability(), forecast));
                    successCount++;

                } catch (Exception e) {
                    predictions.add(FlightPredictionItem.withError(
                            null, null, null, null, null,
                            "Error processing row " + rowCount + ": " + e.getMessage()));
                    errorCount++;
                }
            }

        } catch (Exception e) {
            predictions.add(FlightPredictionItem.withError(
                    null, null, null, null, null,
                    "Error parsing CSV file: " + e.getMessage()));
            errorCount++;
        }

        int totalProcessed = predictions.size();
        return new BatchPredictionResponse(predictions, totalProcessed, successCount, errorCount);
    }
}
