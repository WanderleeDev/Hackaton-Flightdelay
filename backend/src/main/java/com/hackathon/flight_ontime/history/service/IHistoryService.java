package com.hackathon.flight_ontime.history.service;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IHistoryService {

    PageResponseDto<HistoryResponseDto> getAllHistories(Pageable pageable);

    PageResponseDto<BatchHistoryResponseDto> getAllBatchHistories(Pageable pageable);

    PageResponseDto<HistoryResponseDto> getAllHistoryByBatchId(UUID batchId, Pageable pageable);
}
