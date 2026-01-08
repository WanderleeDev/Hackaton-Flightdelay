package com.hackathon.flight_ontime.airline.repository;

import com.hackathon.flight_ontime.airline.model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IAirlineRepository extends JpaRepository<Airline, String> {

    List<Airline> findAirlinesByCode(String code);
}
