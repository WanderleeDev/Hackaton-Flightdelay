package com.hackathon.flight_ontime.predict.controller;

import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.predict.dto.FlightPredictionRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Predict", description = "Delay prediction endpoints")
public interface PredictApi {

    @Operation(
            summary = "Predict flight delay",
            description = "Predicts delay probability for a single flight and saves to history",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Prediction successful",
                            content = @Content(schema = @Schema(implementation = HistoryResponseDto.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid request data")
            }
    )
    ResponseEntity<HistoryResponseDto> predictFlightDelay(FlightPredictionRequest request);

    @Operation(
            summary = "Batch predict flight delays",
            description = "Processes CSV file with multiple flights and returns batch predictions",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Batch prediction successful",
                            content = @Content(schema = @Schema(implementation = BatchHistoryPreviewResponseDto.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid CSV file or batch name")
            }
    )
    ResponseEntity<BatchHistoryPreviewResponseDto> predictBatchFlightDelays(
            @Parameter(description = "CSV file with flight data", required = true) MultipartFile file,
            @Parameter(description = "Name for this batch", required = true) String batchName
    );
}
