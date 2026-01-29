package com.hackathon.flight_ontime.history.dto;

import java.util.List;
import java.util.UUID;

public record BatchHistoryPreviewResponseDto(
        UUID id,
        String batchName,
        List<HistoryResponseDto> histories,
        Integer serialNumber,
        Integer total,
        String createdAt
) {
}
