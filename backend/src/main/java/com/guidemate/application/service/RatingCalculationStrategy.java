package com.guidemate.application.service;

import com.guidemate.infrastructure.persistence.entity.ReviewEntity;

import java.math.BigDecimal;
import java.util.List;

public interface RatingCalculationStrategy {
    BigDecimal calculate(List<ReviewEntity> reviews);
}
