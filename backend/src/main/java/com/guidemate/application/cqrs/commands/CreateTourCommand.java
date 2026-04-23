package com.guidemate.application.cqrs.commands;

import java.math.BigDecimal;

public record CreateTourCommand(
        Long guideId,
        String title,
        String description,
        BigDecimal price,
        Integer durationHours,
        Integer capacity,
        Long categoryId,
        String city,
        String country
) {
}
