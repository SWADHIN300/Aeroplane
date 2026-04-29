package com.nexfly.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "seat_code", nullable = false, length = 5)
    private String seatCode;

    @Column(name = "cabin_class", length = 20)
    private String cabinClass; // BUSINESS or ECONOMY

    @Column(name = "is_taken")
    private Boolean isTaken = false;

    @Column(name = "row_number")
    private Integer rowNumber;

    @Column(name = "is_exit_row")
    private Boolean isExitRow = false;

    // Constructors
    public Seat() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }

    public String getSeatCode() { return seatCode; }
    public void setSeatCode(String seatCode) { this.seatCode = seatCode; }

    public String getCabinClass() { return cabinClass; }
    public void setCabinClass(String cabinClass) { this.cabinClass = cabinClass; }

    public Boolean getIsTaken() { return isTaken; }
    public void setIsTaken(Boolean isTaken) { this.isTaken = isTaken; }

    public Integer getRowNumber() { return rowNumber; }
    public void setRowNumber(Integer rowNumber) { this.rowNumber = rowNumber; }

    public Boolean getIsExitRow() { return isExitRow; }
    public void setIsExitRow(Boolean isExitRow) { this.isExitRow = isExitRow; }
}
