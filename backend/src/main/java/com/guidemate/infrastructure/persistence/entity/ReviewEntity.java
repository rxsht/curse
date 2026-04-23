package com.guidemate.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "reviews")
@Getter
@Setter
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "tour_id")
    private TourEntity tour;
    @OneToOne(optional = false)
    @JoinColumn(name = "booking_id", unique = true)
    private BookingEntity booking;
    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    private UserEntity author;
    private Integer rating;
    @Column(columnDefinition = "text")
    private String comment;
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();
}
