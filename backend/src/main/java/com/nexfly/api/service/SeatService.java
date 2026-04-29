package com.nexfly.api.service;

import com.nexfly.api.entity.Seat;
import com.nexfly.api.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<Seat> getSeatsByFlightId(Long flightId) {
        return seatRepository.findByFlightIdOrderByRowNumberAscSeatCodeAsc(flightId);
    }

    public Seat reserveSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId)
            .orElseThrow(() -> new IllegalArgumentException("Seat not found"));
        if (seat.getIsTaken()) {
            throw new IllegalArgumentException("Seat is already taken");
        }
        seat.setIsTaken(true);
        return seatRepository.save(seat);
    }
}
