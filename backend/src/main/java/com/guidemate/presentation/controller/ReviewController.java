package com.guidemate.presentation.controller;

import com.guidemate.application.service.CurrentUserService;
import com.guidemate.application.service.ReviewApplicationService;
import com.guidemate.presentation.ApiV1Paths;
import com.guidemate.presentation.dto.ReviewDtos;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/reviews")
public class ReviewController {
    private final ReviewApplicationService reviewApplicationService;
    private final CurrentUserService currentUserService;

    public ReviewController(ReviewApplicationService reviewApplicationService, CurrentUserService currentUserService) {
        this.reviewApplicationService = reviewApplicationService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','GUIDE','ADMIN')")
    public ReviewDtos.ReviewResponse create(@Valid @RequestBody ReviewDtos.CreateReviewRequest request) {
        return reviewApplicationService.create(currentUserService.getCurrent().getId(), request);
    }

    @GetMapping("/tour/{tourId}")
    public List<ReviewDtos.ReviewResponse> list(@PathVariable Long tourId) {
        return reviewApplicationService.list(tourId);
    }
}
