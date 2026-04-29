package com.nexfly.api.service;

import com.nexfly.api.entity.Flight;
import com.nexfly.api.exception.ResourceNotFoundException;
import com.nexfly.api.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + id));
    }

    public List<Flight> searchFlights(String from, String to) {
        if (from != null && to != null) {
            return flightRepository.findByDepartureCodeAndArrivalCode(from.toUpperCase(), to.toUpperCase());
        } else if (from != null) {
            return flightRepository.findByDepartureCode(from.toUpperCase());
        } else if (to != null) {
            return flightRepository.findByArrivalCode(to.toUpperCase());
        }
        return flightRepository.findAll();
    }
}
