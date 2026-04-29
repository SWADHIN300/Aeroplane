package com.nexfly.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String airline;

    @Column(nullable = false, length = 100)
    private String type;

    @Column(length = 50)
    private String icon;

    @Column(name = "departure_time", length = 10)
    private String departureTime;

    @Column(name = "departure_code", length = 10)
    private String departureCode;

    @Column(name = "departure_name", length = 100)
    private String departureName;

    @Column(name = "arrival_time", length = 10)
    private String arrivalTime;

    @Column(name = "arrival_code", length = 10)
    private String arrivalCode;

    @Column(name = "arrival_name", length = 100)
    private String arrivalName;

    @Column(length = 20)
    private String duration;

    @Column(length = 50)
    private String stops;

    @Column(name = "flight_class", length = 50)
    private String flightClass;

    @Column(name = "price_inr", nullable = false)
    private Integer priceInr;

    @Column(nullable = false)
    private Boolean confirmed = false;

    @Column(columnDefinition = "TEXT")
    private String amenities; // JSON string: [{"icon":"luggage","text":"25KG"}]

    // Constructors
    public Flight() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAirline() { return airline; }
    public void setAirline(String airline) { this.airline = airline; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getDepartureCode() { return departureCode; }
    public void setDepartureCode(String departureCode) { this.departureCode = departureCode; }

    public String getDepartureName() { return departureName; }
    public void setDepartureName(String departureName) { this.departureName = departureName; }

    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getArrivalCode() { return arrivalCode; }
    public void setArrivalCode(String arrivalCode) { this.arrivalCode = arrivalCode; }

    public String getArrivalName() { return arrivalName; }
    public void setArrivalName(String arrivalName) { this.arrivalName = arrivalName; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getStops() { return stops; }
    public void setStops(String stops) { this.stops = stops; }

    public String getFlightClass() { return flightClass; }
    public void setFlightClass(String flightClass) { this.flightClass = flightClass; }

    public Integer getPriceInr() { return priceInr; }
    public void setPriceInr(Integer priceInr) { this.priceInr = priceInr; }

    public Boolean getConfirmed() { return confirmed; }
    public void setConfirmed(Boolean confirmed) { this.confirmed = confirmed; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }
}
