package com.hackathon.flight_ontime.flight.model;

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
@Table(name = "flights")
public class Flight extends BaseModel {

    @Column(name = "origin_iata", nullable = false)
    String originIata;

    @Column(name = "destination_iata", nullable = false)
    String destinationIata;

    @Column(name = "airline_code")
    String airlineCode;
}
