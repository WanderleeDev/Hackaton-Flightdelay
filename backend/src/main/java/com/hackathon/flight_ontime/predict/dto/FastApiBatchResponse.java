package com.hackathon.flight_ontime.predict.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public record FastApiBatchResponse(
        String airline,
        String origin,
        String destination,
        OffsetDateTime departureDate,
        @JsonProperty("distance_km")
        Double distanceKm,
        Integer hour,
        @JsonProperty("day_of_week")
        Integer dayOfWeek,
        @JsonProperty("delay_prediction")
        Integer delayPrediction,
        @JsonProperty("delay_probability")
        Double delayProbability
) {
}
