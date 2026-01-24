package com.hackathon.flight_ontime.predict.DTO;

import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Request for prediction", name = "DataRequest")
public record DataRequest(
        @Schema(description = "Airline name", example = "AA", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank
        @Size(max = 100)
        String airline,

        @Schema(description = "Origin IATA code", example = "MAD", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank
        @Size(min = 3, max = 4)
        @Pattern(regexp = "^[A-Z]{3,4}", message = "origin must be 3-4 uppercase letters IATA code")
        String origin,

        @Schema(description = "Destination IATA code", example = "BCN", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank
        @Size(min = 3, max = 4)
        @Pattern(regexp = "^[A-Z]{3,4}", message = "destination must be 3-4 uppercase letters IATA code")
        String destination,

        @Schema(description = "Departure date and time in ISO 8601 format", example = "2026-02-13T10:00:00Z", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull
        @FutureOrPresent(message = "departureDate must be present or in the future")
        OffsetDateTime departureDate,

        @Schema(description = "Distance in kilometers", example = "3000.0", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull
        @Positive(message = "distanceKm must be a positive number")
        @Min(3000)
        @Max(13_500)
        Double distanceKm
) {
}
