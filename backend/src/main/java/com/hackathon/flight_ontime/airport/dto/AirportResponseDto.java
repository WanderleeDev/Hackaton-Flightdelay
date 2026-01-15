package com.hackathon.flight_ontime.airport.dto;

public record AirportResponseDto(
        String id,
        String name,
        String iata,
        Coordinates coordinates
) {
    public record Coordinates(Double latitude, Double longitude) {}
}
