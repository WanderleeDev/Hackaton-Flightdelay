package com.hackathon.flight_ontime.predict.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record FastApiRequest(
        @JsonProperty("airline") @NotNull String airline,
        @JsonProperty("origin") @NotNull String origin,
        @JsonProperty("destination") @NotNull String destination,
        @JsonProperty("departure_date") OffsetDateTime departureDate,
        @JsonProperty("distance_km") Double distanceKm
) {
}
