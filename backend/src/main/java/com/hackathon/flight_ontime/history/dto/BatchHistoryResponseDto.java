package com.hackathon.flight_ontime.history.dto;

import org.springframework.data.domain.Page;

import java.util.UUID;

public record BatchHistoryResponseDto(
        UUID id,
        String batchName,
        Page<HistoryResponseDto> histories,
        Integer serialNumber,
        String createdAt
) {
}
