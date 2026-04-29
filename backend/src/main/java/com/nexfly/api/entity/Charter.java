package com.nexfly.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "charters")
public class Charter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String icon;

    @Column(name = "departure_time", length = 10)
    private String departureTime;

    @Column(name = "departure_full", length = 200)
    private String departureFull;

    @Column(name = "arrival_time", length = 10)
    private String arrivalTime;

    @Column(name = "arrival_full", length = 200)
    private String arrivalFull;

    @Column(length = 20)
    private String duration;

    @Column(length = 50)
    private String stops;

    @Column(name = "price_inr", nullable = false)
    private Integer priceInr;

    @Column(name = "has_stop")
    private Boolean hasStop = false;

    // Constructors
    public Charter() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getDepartureFull() { return departureFull; }
    public void setDepartureFull(String departureFull) { this.departureFull = departureFull; }

    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getArrivalFull() { return arrivalFull; }
    public void setArrivalFull(String arrivalFull) { this.arrivalFull = arrivalFull; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getStops() { return stops; }
    public void setStops(String stops) { this.stops = stops; }

    public Integer getPriceInr() { return priceInr; }
    public void setPriceInr(Integer priceInr) { this.priceInr = priceInr; }

    public Boolean getHasStop() { return hasStop; }
    public void setHasStop(Boolean hasStop) { this.hasStop = hasStop; }
}
