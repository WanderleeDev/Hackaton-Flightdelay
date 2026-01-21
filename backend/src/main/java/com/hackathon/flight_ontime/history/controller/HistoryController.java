package com.hackathon.flight_ontime.history.controller;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.service.IHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequiredArgsConstructor
@Validated
@Tag(name = "History", description = "Operations to retrieve prediction history")
public class HistoryController {

    private final IHistoryService historyService;


    @Operation(
            summary = "List prediction history",
            description = "Returns a paginated list with the flight delay prediction history."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "History retrieved successfully",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/history")
    public ResponseEntity<PageResponseDto<HistoryResponseDto>> getHistories(
            @ParameterObject Pageable pageable
    ) {
        return ResponseEntity.ok(historyService.getAllHistories(pageable));
    }


    @Operation(
            summary = "List prediction history by batch",
            description = "Returns a paginated list with the flight delay prediction history by batch."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "History retrieved successfully",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/history/batch")
    public ResponseEntity<PageResponseDto<BatchHistoryResponseDto>> getBatchHistories(
            @ParameterObject Pageable pageable
    ) {
        return ResponseEntity.ok(historyService.getAllBatchHistories(pageable));
    }


    @Operation(
            summary = "Retrieve prediction history by batch id",
            description = "Returns a paginated list with the flight delay prediction history by batch id."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "History retrieved successfully",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/history/batches/{batchId}")
    public ResponseEntity<PageResponseDto<HistoryResponseDto>> getHistoriesByBatchId(
            @PathVariable UUID batchId,
            @ParameterObject Pageable pageable
    ) {
        return ResponseEntity.ok(historyService.getAllHistoryByBatchId(batchId, pageable));
    }
}
