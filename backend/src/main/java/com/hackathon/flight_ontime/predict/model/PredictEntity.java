package com.hackathon.flight_ontime.predict.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Predictions")
public class PredictEntity {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

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
        this.id = UUID.randomUUID();
        this.dateTime = ZonedDateTime.now();
    }

}
