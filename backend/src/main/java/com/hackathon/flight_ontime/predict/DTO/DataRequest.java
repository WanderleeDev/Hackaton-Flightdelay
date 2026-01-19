package com.hackathon.flight_ontime.predict.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.FutureOrPresent;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Request for prediction", name = "DataRequest")
public record DataRequest(
        @Schema(description = "Airline name", example = "Iberia", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank
        @Size(max = 100)
        String airline,

        @Schema(description = "Origin IATA code", example = "MAD", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank
        @Size(min = 3)
        @Pattern(regexp = "^[A-Z]{3}$", message = "origin must be a 3 - letter uppercase IATA code")
        String origin,

        @Schema(description = "Destination IATA code", example = "BCN", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank
        @Size(min = 3)
        @Pattern(regexp = "^[A-Z]{3}$", message = "destination must be a 3 - letter uppercase IATA code")
        String destination,

        @Schema(description = "Departure date and time in ISO 8601 format", example = "2026-01-13T10:00:00Z", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull
        @FutureOrPresent(message = "departureDate must be present or in the future")
        OffsetDateTime departureDate,

        @Schema(description = "Distance in kilometers", example = "500.0", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull
        @Positive(message = "distanceKm must be a positive number")
        Double distanceKm
) {
}
