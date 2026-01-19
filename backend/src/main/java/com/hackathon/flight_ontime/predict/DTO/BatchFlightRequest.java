package com.hackathon.flight_ontime.predict.DTO;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record BatchFlightRequest(
        @NotNull String airline,
        @NotNull String origin,
        @NotNull String destination,
        OffsetDateTime departureDate,
        Double distanceKm) {
}
