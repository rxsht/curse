package com.guidemate.presentation.controller;

import com.guidemate.application.service.CurrentUserService;
import com.guidemate.application.service.TourApplicationService;
import com.guidemate.presentation.ApiV1Paths;
import com.guidemate.presentation.dto.TourDtos;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/tours")
public class TourController {
    private final TourApplicationService tourApplicationService;
    private final CurrentUserService currentUserService;

    public TourController(TourApplicationService tourApplicationService, CurrentUserService currentUserService) {
        this.tourApplicationService = tourApplicationService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public Page<TourDtos.TourResponse> search(
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return tourApplicationService.search(minPrice, maxPrice, categoryId, city, page, size);
    }

    @GetMapping("/{id}")
    public TourDtos.TourResponse details(@PathVariable Long id) {
        return tourApplicationService.details(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('GUIDE','ADMIN')")
    public TourDtos.TourResponse create(@Valid @RequestBody TourDtos.CreateTourRequest request) {
        return tourApplicationService.create(currentUserService.getCurrent().getId(), request);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('GUIDE','ADMIN')")
    public TourDtos.TourResponse update(@PathVariable Long id, @RequestBody TourDtos.UpdateTourRequest request) {
        return tourApplicationService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('GUIDE','ADMIN')")
    public void delete(@PathVariable Long id) {
        tourApplicationService.delete(id);
    }
}
