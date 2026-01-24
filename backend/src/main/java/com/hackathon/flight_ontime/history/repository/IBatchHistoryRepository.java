package com.hackathon.flight_ontime.history.repository;

import com.hackathon.flight_ontime.history.model.HistoryBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface IBatchHistoryRepository extends JpaRepository<HistoryBatch, UUID> {
    @Query("SELECT b FROM HistoryBatch b LEFT JOIN FETCH b.histories WHERE b.id = :id")
    Optional<HistoryBatch> findByIdWithHistories(@Param("id") UUID id);
}
