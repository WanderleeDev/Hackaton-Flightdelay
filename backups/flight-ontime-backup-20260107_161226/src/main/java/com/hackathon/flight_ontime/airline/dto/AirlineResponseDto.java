package com.hackathon.flight_ontime.airline.dto;

import jakarta.validation.constraints.NotBlank;

public record AirlineResponseDto(
        @NotBlank
        String id,

        @NotBlank
        String name,

        @NotBlank
        String code
) {
}
