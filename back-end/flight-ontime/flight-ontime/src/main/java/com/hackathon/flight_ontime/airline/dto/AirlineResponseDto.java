package com.hackathon.flight_ontime.airline.dto;

import jakarta.validation.constraints.NotBlank;

record AirlineResponseDto(
        @NotBlank
        String id,
        @NotBlank
        String name,
        @NotBlank
        String code
) {
}
