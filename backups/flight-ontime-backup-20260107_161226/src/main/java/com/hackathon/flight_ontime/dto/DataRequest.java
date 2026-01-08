package com.hackathon.flight_ontime.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.OffsetDateTime;

public record DataRequest(
        @NotBlank String airline,
        @NotBlank @Pattern(regexp = "^[A-Z]{3}$", message = "Debe ser un código IATA de 3 letras mayúsculas") String origin,
        @NotBlank @Pattern(regexp = "^[A-Z]{3}$", message = "Debe ser un código IATA de 3 letras mayúsculas") String destination,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
        @NotNull OffsetDateTime departureDate,
        @PositiveOrZero Double distanceKm
) {
}
