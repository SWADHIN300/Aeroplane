package com.nexfly.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookingRequest(
    @NotNull(message = "Flight ID is required")
    Long flightId,

    Long seatId,

    @NotBlank(message = "From code is required")
    String fromCode,

    @NotBlank(message = "From city is required")
    String fromCity,

    @NotBlank(message = "To code is required")
    String toCode,

    @NotBlank(message = "To city is required")
    String toCity,

    @NotBlank(message = "Flight date is required")
    String flightDate,

    String flightTime,

    @NotBlank(message = "Passenger name is required")
    String passengerName,

    String flightClass,
    String flightNo,
    String duration
) {}
