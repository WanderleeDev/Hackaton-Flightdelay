package com.hackathon.flight_ontime.airport.dto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record AirportResponseDto(
        @Schema(description = "Airport unique identifier", example = "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6")
        UUID id,
        @Schema(description = "Airport name", example = "Adolfo Suárez Madrid-Barajas Airport")
        String name,
        @Schema(description = "Airport IATA code", example = "MAD")
        String iata,
        @Schema(description = "Airport location coordinates", implementation = Coordinates.class)
        Coordinates coordinates
) {
    public record Coordinates(Double latitude, Double longitude) {}
}
