package com.hackathon.flight_ontime.history.controller;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.mapper.HistoryRecordMapper;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.history.service.IHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/history")
public class HistoryController implements HistoryApi {

        private final IHistoryService historyService;
        private final HistoryRecordMapper historyMapper;

        @Override
        public ResponseEntity<PageResponseDto<HistoryResponseDto>> getHistories(Pageable pageable) {
                return ResponseEntity.ok(historyService.getHistories(pageable));
        }

        @Override
        public ResponseEntity<PageResponseDto<BatchHistoryPreviewResponseDto>> getBatchHistories(Pageable pageable) {
                return ResponseEntity.ok(historyService.getBatchHistories(pageable));
        }

        @Override
        public ResponseEntity<BatchHistoryResponseDto> getHistoriesByBatchId(UUID batchId, Pageable pageable) {
                Optional<HistoryBatch> optionalBatch = historyService.getBatchById(batchId);

                if (optionalBatch.isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Batch not found");
                }

                Page<History> batchHistories = historyService.getHistoriesById(batchId, pageable);

                var batch = historyMapper.toBatchDto(optionalBatch.get(), batchHistories);

                return ResponseEntity.ok(batch);
        }

        @Override
        public ResponseEntity<StreamingResponseBody> downloadBatch(UUID batchId) {
                return ResponseEntity.ok()
                                .contentType(MediaType.parseMediaType("text/csv"))
                                .header(HttpHeaders.CONTENT_DISPOSITION,
                                                "attachment; filename=\"batch_" + batchId + ".csv\"")
                                .body(historyService.exportHistoriesByBatchId(batchId));
        }
}
