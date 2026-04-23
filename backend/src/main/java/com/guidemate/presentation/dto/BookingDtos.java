package com.guidemate.presentation.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public final class BookingDtos {
    private BookingDtos() {
    }

    public record CreateBookingRequest(
            @NotNull Long tourId,
            @Min(1) Integer participants,
            @FutureOrPresent LocalDate tourDate
    ) {}

    public record BookingResponse(
            Long id,
            Long tourId,
            String tourTitle,
            Integer participants,
            String status,
            LocalDate tourDate
    ) {}
}
