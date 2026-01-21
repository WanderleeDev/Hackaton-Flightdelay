package com.hackathon.flight_ontime.history.repository;

import com.hackathon.flight_ontime.history.model.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IHistoryRepository extends JpaRepository<History, UUID> {
    Page<History> findByBatch_Id(UUID batchId, Pageable pageable);
}
