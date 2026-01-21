package com.hackathon.flight_ontime.history.dto;

import java.util.List;

public record BatchHistoryResponseDto(
        String batchName,
        List<HistoryResponseDto> histories,
        Integer serialNumber,
        Integer total,
        String createdAt
) {
}
