package com.guidemate.application.service;

import com.guidemate.infrastructure.persistence.entity.ReviewEntity;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
public class AverageRatingStrategy implements RatingCalculationStrategy {
    @Override
    public BigDecimal calculate(List<ReviewEntity> reviews) {
        if (reviews.isEmpty()) {
            return BigDecimal.ZERO;
        }
        double avg = reviews.stream().mapToInt(ReviewEntity::getRating).average().orElse(0);
        return BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP);
    }
}
