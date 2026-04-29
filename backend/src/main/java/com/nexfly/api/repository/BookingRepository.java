package com.nexfly.api.repository;

import com.nexfly.api.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Booking> findByUserIdAndStatusOrderByCreatedAtDesc(UUID userId, String status);
    Optional<Booking> findByBookingRef(String bookingRef);
}
