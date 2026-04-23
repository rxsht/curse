package com.guidemate.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "ratings_summary")
@Getter
@Setter
public class RatingSummaryEntity {
    @Id
    @Column(name = "tour_id")
    private Long tourId;
    @OneToOne
    @MapsId
    @JoinColumn(name = "tour_id")
    private TourEntity tour;
    @Column(name = "average_rating", nullable = false)
    private BigDecimal averageRating = BigDecimal.ZERO;
    @Column(name = "total_reviews", nullable = false)
    private Integer totalReviews = 0;
}
