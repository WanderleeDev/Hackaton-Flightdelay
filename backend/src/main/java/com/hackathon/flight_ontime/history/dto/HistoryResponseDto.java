package com.hackathon.flight_ontime.history.dto;

import java.util.UUID;

public record HistoryResponseDto(
        UUID id,
        String airline,
        String origin,
        String destination,
        String departureDate,
        Double distanceKm,
        Double delayPrediction,
        Double delayProbability
) {
}
