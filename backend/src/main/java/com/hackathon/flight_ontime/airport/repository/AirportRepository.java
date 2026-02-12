package com.hackathon.flight_ontime.airport.repository;

import com.hackathon.flight_ontime.airport.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AirportRepository extends JpaRepository<Airport, UUID> {

    /**
     * Find all distinct destination airports from flights originating at the given
     * IATA code.
     * This query joins the flights table to get actual destinations based on flight
     * data.
     */
    @Query("SELECT DISTINCT a FROM Airport a " +
            "WHERE a.iata IN (SELECT f.destinationIata FROM Flight f WHERE f.originIata = :originIata)")
    List<Airport> findDestinationsByOriginIata(@Param("originIata") String originIata);

    /**
     * Find airport by IATA code
     */
    Airport findByIata(String iata);
}
