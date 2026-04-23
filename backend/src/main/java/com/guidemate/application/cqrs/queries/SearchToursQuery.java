package com.guidemate.application.cqrs.queries;

import java.math.BigDecimal;

public record SearchToursQuery(
        BigDecimal minPrice,
        BigDecimal maxPrice,
        Long categoryId,
        String city,
        int page,
        int size
) {
}
