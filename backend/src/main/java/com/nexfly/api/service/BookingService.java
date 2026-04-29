package com.nexfly.api.service;

import com.nexfly.api.dto.BookingRequest;
import com.nexfly.api.entity.Booking;
import com.nexfly.api.entity.User;
import com.nexfly.api.exception.ResourceNotFoundException;
import com.nexfly.api.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SeatService seatService;

    public BookingService(BookingRepository bookingRepository, SeatService seatService) {
        this.bookingRepository = bookingRepository;
        this.seatService = seatService;
    }

    public Booking createBooking(BookingRequest request, User user) {
        // Reserve seat if provided
        if (request.seatId() != null) {
            seatService.reserveSeat(request.seatId());
        }

        Booking booking = new Booking();
        booking.setBookingRef(generateBookingRef());
        booking.setUserId(user.getId());
        booking.setFlightId(request.flightId());
        booking.setSeatId(request.seatId());
        booking.setFromCode(request.fromCode());
        booking.setFromCity(request.fromCity());
        booking.setToCode(request.toCode());
        booking.setToCity(request.toCity());
        booking.setFlightDate(request.flightDate());
        booking.setFlightTime(request.flightTime());
        booking.setPassengerName(request.passengerName());
        booking.setFlightClass(request.flightClass());
        booking.setFlightNo(request.flightNo());
        booking.setDuration(request.duration());
        booking.setStatus("confirmed");

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(UUID userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Booking> getUserBookingsByStatus(UUID userId, String status) {
        return bookingRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, status);
    }

    public Booking getBookingById(UUID id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    public Booking cancelBooking(UUID id, User user) {
        Booking booking = getBookingById(id);
        if (!booking.getUserId().equals(user.getId())) {
            throw new IllegalArgumentException("You can only cancel your own bookings");
        }
        if ("cancelled".equals(booking.getStatus())) {
            throw new IllegalArgumentException("Booking is already cancelled");
        }
        booking.setStatus("cancelled");
        return bookingRepository.save(booking);
    }

    private String generateBookingRef() {
        int num = ThreadLocalRandom.current().nextInt(1000, 9999);
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        char c1 = letters.charAt(ThreadLocalRandom.current().nextInt(letters.length()));
        char c2 = letters.charAt(ThreadLocalRandom.current().nextInt(letters.length()));
        return "NX-" + num + "-" + c1 + c2;
    }
}
