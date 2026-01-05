package com.hackathon.flight_ontime.airline.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "airlines")
public class Airline {
    @Id
    String id;

    @Column(nullable = false, unique = true)
    String name;

    @Column(nullable = false, unique = true)
    String code;
}
