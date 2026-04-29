package com.nexfly.api.repository;

import com.nexfly.api.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByDepartureCodeAndArrivalCode(String departureCode, String arrivalCode);
    List<Flight> findByDepartureCode(String departureCode);
    List<Flight> findByArrivalCode(String arrivalCode);
}
