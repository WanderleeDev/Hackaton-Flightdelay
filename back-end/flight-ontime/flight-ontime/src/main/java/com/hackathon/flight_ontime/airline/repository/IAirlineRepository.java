package com.hackathon.flight_ontime.airline.repository;

import com.hackathon.flight_ontime.airline.model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface AirlineRepository extends JpaRepository<Airline, String> {
    ArrayList<Airline> findAirlineByCode(String code);
}
