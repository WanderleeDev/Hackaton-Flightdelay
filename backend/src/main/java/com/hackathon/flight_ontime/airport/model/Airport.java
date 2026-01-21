package com.hackathon.flight_ontime.airport.model;

import com.hackathon.flight_ontime.common.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "airports")
public class Airport extends BaseModel {
    @Column(nullable = false)
    String name;

    @Column(nullable = false, unique = true)
    String iata;

    @Column(nullable = false)
    Double latitude;

    @Column(nullable = false)
    Double longitude;
}
