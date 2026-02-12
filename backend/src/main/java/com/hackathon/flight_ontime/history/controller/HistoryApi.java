package com.hackathon.flight_ontime.history.controller;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.UUID;

@Tag(name = "History", description = "Operations to retrieve prediction history")
public interface HistoryApi {

  @Operation(summary = "List prediction history", description = "Returns a paginated list with the flight delay prediction history.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "History retrieved successfully", content = @Content(mediaType = "application/json"))
  })
  @GetMapping("")
  ResponseEntity<PageResponseDto<HistoryResponseDto>> getHistories(
      @ParameterObject Pageable pageable);

  @Operation(summary = "List prediction history by batch", description = "Returns a paginated list with the flight delay prediction history by batch.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "History retrieved successfully", content = @Content(mediaType = "application/json"))
  })
  @GetMapping("/batch")
  ResponseEntity<PageResponseDto<BatchHistoryPreviewResponseDto>> getBatchHistories(
      @ParameterObject Pageable pageable);

  @Operation(summary = "Retrieve prediction history by batch id", description = "Returns a paginated list with the flight delay prediction history by batch id.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "History retrieved successfully", content = @Content(mediaType = "application/json"))
  })
  @GetMapping("/batches/{batchId}")
  ResponseEntity<BatchHistoryResponseDto> getHistoriesByBatchId(
      @PathVariable UUID batchId,
      @ParameterObject Pageable pageable);

  @Operation(summary = "Download prediction history by batch id", description = "Downloads a CSV file with the flight delay prediction history by batch id.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "History downloaded successfully", content = @Content(mediaType = "text/csv"))
  })
  @GetMapping("/batches/{batchId}/download")
  ResponseEntity<StreamingResponseBody> downloadBatch(@PathVariable UUID batchId);
}
