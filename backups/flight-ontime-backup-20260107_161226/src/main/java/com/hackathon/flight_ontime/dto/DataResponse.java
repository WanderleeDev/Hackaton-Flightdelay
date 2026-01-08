package com.hackathon.flight_ontime.dto;

public record DataResponse(
        Double probability,
        String forecast
) {
}
