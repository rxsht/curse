package com.guidemate.presentation.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public final class ReviewDtos {
    private ReviewDtos() {
    }

    public record CreateReviewRequest(
            @NotNull Long bookingId,
            @NotNull Long tourId,
            @Min(1) @Max(5) Integer rating,
            String comment
    ) {}

    public record ReviewResponse(
            Long id,
            Long tourId,
            String author,
            Integer rating,
            String comment
    ) {}
}
