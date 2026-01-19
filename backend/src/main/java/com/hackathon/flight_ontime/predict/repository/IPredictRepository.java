package com.hackathon.flight_ontime.predict.repository;

import com.hackathon.flight_ontime.predict.model.PredictEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPredictRepository extends JpaRepository<PredictEntity, String> {
}
