package com.hackathon.flight_ontime.history.repository;

import com.hackathon.flight_ontime.history.model.HistoryBatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IBatchHistoryRepository extends JpaRepository<HistoryBatch, UUID> {
}
