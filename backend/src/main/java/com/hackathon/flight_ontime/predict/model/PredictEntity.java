package com.hackathon.flight_ontime.predict.model;

import com.hackathon.flight_ontime.common.BaseModel;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "predictions")
public class PredictEntity extends BaseModel {

    @Column(nullable = false)
    String airline;

    @Column(nullable = false)
    String origin;

    @Column(nullable = false)
    String destination;

    @Column(nullable = false)
    OffsetDateTime departureDate;

    @Column(nullable = false)
    Double distanceKm;

    @Column(nullable = false)
    Double delayPrediction;

    @Column(nullable = false)
    Double delayProbability;

    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime dateTime;

    public PredictEntity() {
    }

    @PrePersist
    public void assignDefaultValues(){
        this.dateTime = ZonedDateTime.now();
    }

}
