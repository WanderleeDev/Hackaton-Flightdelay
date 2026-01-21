package com.hackathon.flight_ontime.history.service;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.mapper.HistoryMapper;
import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.history.model.HistoryBatch;
import com.hackathon.flight_ontime.history.repository.IBatchHistoryRepository;
import com.hackathon.flight_ontime.history.repository.IHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoryService implements IHistoryService {

    static final int MAX_PREVIEW = 4;
    private final IHistoryRepository historyRepository;
    private final HistoryMapper historyMapper;
    private final IBatchHistoryRepository batchHistoryRepository;

    @Override
    public PageResponseDto<HistoryResponseDto> getAllHistories(Pageable pageable) {
        Page<History> historyPage = historyRepository.findAll(pageable);

        return new PageResponseDto<HistoryResponseDto>(
                historyMapper.toDtoList(historyPage.getContent()),
                historyPage.getNumber(),
                historyPage.getSize(),
                historyPage.getTotalElements(),
                historyPage.getTotalPages(),
                historyPage.isLast(),
                historyPage.isFirst()
        );
    }

    @Override
    public PageResponseDto<BatchHistoryResponseDto> getAllBatchHistories(Pageable pageable) {
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by(Sort.Direction.DESC, "createdAt")
            );
        }

        Page<HistoryBatch> batchPage = batchHistoryRepository.findAll(pageable);
        List<BatchHistoryResponseDto> batchHistoryPreview = batchPage.getContent().stream().map(batch -> {
            Pageable historyPageable = PageRequest.of(0, MAX_PREVIEW);
            Page<History> historyPreview = historyRepository.findByBatch_Id(batch.getId(), historyPageable);

            return new BatchHistoryResponseDto(
                    batch.getBatchName(),
                    historyMapper.toDtoList(historyPreview.getContent()),
                    batch.getSeralNumber(),
                    (int) historyPreview.getTotalElements(),
                    historyMapper.mapDepartureDate(batch.getCreatedAt())
            );
        }).toList();

        return new PageResponseDto<BatchHistoryResponseDto>(
                batchHistoryPreview,
                batchPage.getNumber(),
                batchPage.getSize(),
                batchPage.getTotalElements(),
                batchPage.getTotalPages(),
                batchPage.isLast(),
                batchPage.isFirst()
        );
    }

    @Override
    public PageResponseDto<HistoryResponseDto> getAllHistoryByBatchId(UUID batchId, Pageable pageable) {
        Page<History> page = historyRepository.findByBatch_Id(batchId, pageable);
        return new PageResponseDto<HistoryResponseDto>(
                historyMapper.toDtoList(page.getContent()),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast(),
                page.isFirst()
        );
    }
}
