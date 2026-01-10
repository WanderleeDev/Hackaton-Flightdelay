package com.hackathon.flight_ontime.predict.DTO;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record DataRequest(
        @NotNull String airline,
        @NotNull String origin,
        @NotNull String destination,
        @NotNull OffsetDateTime departureDate,
        Double distanceKm
) {
}
