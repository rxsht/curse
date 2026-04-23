package com.guidemate.application.service;

import com.guidemate.infrastructure.persistence.entity.ReviewEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AverageRatingStrategyTest {
    private final AverageRatingStrategy strategy = new AverageRatingStrategy();

    @Test
    void shouldCalculateAverage() {
        ReviewEntity r1 = new ReviewEntity();
        r1.setRating(4);
        ReviewEntity r2 = new ReviewEntity();
        r2.setRating(5);
        assertEquals("4.50", strategy.calculate(List.of(r1, r2)).toString());
    }
}
