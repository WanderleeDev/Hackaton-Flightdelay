package com.hackathon.flight_ontime.history.dto;

import java.util.UUID;

public record HistoryResponseDto(
        UUID id,
        String status,
        String origin,
        String destination,
        String departureDate,
        String airline,
        Double distanceKm,
        Double delayProbability,
        String atmospherics
) {
}
