package com.hackathon.flight_ontime.history.model;

import com.hackathon.flight_ontime.common.model.BaseModel;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.OffsetDateTime;

@Entity
@Table(name = "histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class History extends BaseModel {
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

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "batch_id")
    HistoryBatch batch;
}
