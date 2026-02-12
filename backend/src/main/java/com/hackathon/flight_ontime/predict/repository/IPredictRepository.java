package com.hackathon.flight_ontime.predict.repository;

import com.hackathon.flight_ontime.predict.model.PredictEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IPredictRepository extends JpaRepository<PredictEntity, UUID> {
}
