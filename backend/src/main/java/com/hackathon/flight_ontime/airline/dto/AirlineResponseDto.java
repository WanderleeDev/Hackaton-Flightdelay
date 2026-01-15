package com.hackathon.flight_ontime.airline.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import io.swagger.v3.oas.annotations.media.Schema;

public record AirlineResponseDto(
        @Schema(description = "Airline unique identifier", example = "123e4567-e89b-12d3-a456-426614174000")
        @NotBlank
        @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")
        String id,

        @Schema(description = "Airline name", example = "Iberia")
        @NotBlank
        String name,

        @Schema(description = "Airline code", example = "IB")
        @NotBlank
        @Pattern(regexp = "^[A-Z]{2,3}$", message = "code must be 2 or 3 uppercase letters")
        String code
) {
}
