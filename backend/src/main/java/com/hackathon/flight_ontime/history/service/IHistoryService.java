package com.hackathon.flight_ontime.history.service;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.Optional;
import java.util.UUID;

public interface IHistoryService {

    PageResponseDto<HistoryResponseDto> getHistories(Pageable pageable);

    PageResponseDto<BatchHistoryPreviewResponseDto> getBatchHistories(Pageable pageable);

    Page<History> getHistoriesById(UUID batchId, Pageable pageable);

    Optional<HistoryBatch> getBatchById(UUID batchId);

    StreamingResponseBody exportHistoriesByBatchId(UUID batchId);
}
