package com.hackathon.flight_ontime.airline.model;

import com.hackathon.flight_ontime.common.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Airline extends BaseModel {

    @Column(nullable = false, unique = true)
    String name;

    @Column(nullable = false, unique = true)
    String code;
}
