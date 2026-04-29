package com.nexfly.api.repository;

import com.nexfly.api.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightIdOrderByRowNumberAscSeatCodeAsc(Long flightId);
}
