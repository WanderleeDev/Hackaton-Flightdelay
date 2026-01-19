package com.hackathon.flight_ontime.predict.DTO;

import java.time.OffsetDateTime;

public record FlightPredictionItem(
        String airline,
        String origin,
        String destination,
        OffsetDateTime departureDate,
        Double distanceKm,
        Double probability,
        String forecast,
        String error) {
    // Constructor for successful predictions
    public FlightPredictionItem(String airline, String origin, String destination,
            OffsetDateTime departureDate, Double distanceKm,
            Double probability, String forecast) {
        this(airline, origin, destination, departureDate, distanceKm, probability, forecast, null);
    }

    // Constructor for failed predictions
    public static FlightPredictionItem withError(String airline, String origin, String destination,
            OffsetDateTime departureDate, Double distanceKm,
            String error) {
        return new FlightPredictionItem(airline, origin, destination, departureDate, distanceKm, null, null, error);
    }
}
