package com.hackathon.flight_ontime.history.repository;

import com.hackathon.flight_ontime.history.model.History;

import jakarta.persistence.QueryHint;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import static org.hibernate.jpa.HibernateHints.HINT_FETCH_SIZE;

import java.util.UUID;
import java.util.stream.Stream;

public interface IHistoryRepository extends JpaRepository<History, UUID> {
    Page<History> findByBatch_Id(UUID batchId, Pageable pageable);

    @QueryHints(value = @QueryHint(name = HINT_FETCH_SIZE, value = "50"))
    @Query("SELECT h FROM History h WHERE h.batch.id = :batchId")
    Stream<History> streamByBatchId(@Param("batchId") UUID batchId);
}
