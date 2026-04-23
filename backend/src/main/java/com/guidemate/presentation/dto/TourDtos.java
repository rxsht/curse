package com.guidemate.presentation.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public final class TourDtos {
    private TourDtos() {
    }

    public record CreateTourRequest(
            @NotBlank String title,
            @NotBlank String description,
            @NotNull BigDecimal price,
            @Min(1) Integer durationHours,
            @Min(1) Integer capacity,
            @NotNull Long categoryId,
            @NotBlank String city,
            @NotBlank String country,
            String address,
            Double latitude,
            Double longitude
    ) {}

    public record UpdateTourRequest(
            String title,
            String description,
            BigDecimal price,
            Integer durationHours,
            Integer capacity,
            Boolean active
    ) {}

    public record TourResponse(
            Long id,
            String title,
            String description,
            BigDecimal price,
            Integer durationHours,
            Integer capacity,
            String category,
            String city,
            String country,
            String guideName
    ) {}
}
