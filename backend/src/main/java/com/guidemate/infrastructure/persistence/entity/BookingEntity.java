package com.guidemate.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "tour_id")
    private TourEntity tour;
    @ManyToOne(optional = false)
    @JoinColumn(name = "tourist_id")
    private UserEntity tourist;
    private Integer participants;
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.CREATED;
    @Column(name = "booked_at")
    private Instant bookedAt = Instant.now();
    @Column(name = "tour_date")
    private LocalDate tourDate;
}
