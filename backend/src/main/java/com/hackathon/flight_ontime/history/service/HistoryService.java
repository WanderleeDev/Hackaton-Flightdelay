package com.hackathon.flight_ontime.history.service;

import com.hackathon.flight_ontime.common.dto.PageResponseDto;
import com.hackathon.flight_ontime.history.dto.BatchHistoryPreviewResponseDto;
import com.hackathon.flight_ontime.history.dto.HistoryResponseDto;
import com.hackathon.flight_ontime.history.mapper.HistoryRecordMapper;
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
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoryService implements IHistoryService {

    static final int MAX_PREVIEW = 4;
    private final IHistoryRepository historyRepository;
    private final HistoryRecordMapper historyMapper;
    private final IBatchHistoryRepository batchHistoryRepository;

    @Override
    public PageResponseDto<HistoryResponseDto> getHistories(Pageable pageable) {
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
    public PageResponseDto<BatchHistoryPreviewResponseDto> getBatchHistories(Pageable pageable) {
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by(Sort.Direction.DESC, "createdAt")
            );
        }

        Page<HistoryBatch> batchPage = batchHistoryRepository.findAll(pageable);
        List<BatchHistoryPreviewResponseDto> batchHistoryPreview = batchPage.getContent().stream().map(batch -> {
            Pageable historyPageable = PageRequest.of(0, MAX_PREVIEW);
            Page<History> historyPreview = historyRepository.findByBatch_Id(batch.getId(), historyPageable);

            return new BatchHistoryPreviewResponseDto(
                batch.getId(),
                batch.getBatchName(),
                historyMapper.toDtoList(historyPreview.getContent()),
                batch.getSerialNumber(),
                (int) historyPreview.getTotalElements(),
                historyMapper.mapDepartureDate(batch.getCreatedAt())
            );
        }).toList();

        return new PageResponseDto<BatchHistoryPreviewResponseDto>(
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
    public Page<History> getHistoriesById(UUID batchId, Pageable pageable) {
        return historyRepository.findByBatch_Id(batchId, pageable);
    }


    @Override
    public Optional<HistoryBatch> getBatchById(UUID batchId) {
        return batchHistoryRepository.findById(batchId);
    }
}
