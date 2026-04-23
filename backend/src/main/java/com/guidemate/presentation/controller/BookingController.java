package com.guidemate.presentation.controller;

import com.guidemate.application.service.BookingApplicationService;
import com.guidemate.application.service.CurrentUserService;
import com.guidemate.presentation.ApiV1Paths;
import com.guidemate.presentation.dto.BookingDtos;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/bookings")
public class BookingController {
    private final BookingApplicationService bookingApplicationService;
    private final CurrentUserService currentUserService;

    public BookingController(BookingApplicationService bookingApplicationService, CurrentUserService currentUserService) {
        this.bookingApplicationService = bookingApplicationService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','GUIDE','ADMIN')")
    public BookingDtos.BookingResponse create(@Valid @RequestBody BookingDtos.CreateBookingRequest request) {
        return bookingApplicationService.create(currentUserService.getCurrent().getId(), request);
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('USER','GUIDE','ADMIN')")
    public void cancel(@PathVariable Long id) {
        bookingApplicationService.cancel(id);
    }

    @GetMapping("/history")
    @PreAuthorize("hasAnyRole('USER','GUIDE','ADMIN')")
    public List<BookingDtos.BookingResponse> history() {
        return bookingApplicationService.history(currentUserService.getCurrent().getId());
    }
}
