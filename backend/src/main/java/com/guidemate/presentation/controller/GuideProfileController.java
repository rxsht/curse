package com.guidemate.presentation.controller;

import com.guidemate.application.service.CurrentUserService;
import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.persistence.entity.GuideProfileEntity;
import com.guidemate.infrastructure.persistence.repository.GuideProfileRepository;
import com.guidemate.presentation.ApiV1Paths;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/guide-profiles")
public class GuideProfileController {
    private final GuideProfileRepository guideProfileRepository;
    private final CurrentUserService currentUserService;

    public GuideProfileController(GuideProfileRepository guideProfileRepository, CurrentUserService currentUserService) {
        this.guideProfileRepository = guideProfileRepository;
        this.currentUserService = currentUserService;
    }

    public record GuideProfileRequest(String bio, Integer yearsOfExperience, String languages) {}

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('GUIDE','ADMIN')")
    public GuideProfileEntity me() {
        return guideProfileRepository.findByUserId(currentUserService.getCurrent().getId())
                .orElseThrow(() -> new NotFoundException("Guide profile not found"));
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('GUIDE','ADMIN')")
    public GuideProfileEntity upsert(@RequestBody GuideProfileRequest request) {
        GuideProfileEntity profile = guideProfileRepository.findByUserId(currentUserService.getCurrent().getId())
                .orElseGet(GuideProfileEntity::new);
        profile.setUser(currentUserService.getCurrent());
        profile.setBio(request.bio());
        profile.setYearsOfExperience(request.yearsOfExperience() == null ? 0 : request.yearsOfExperience());
        profile.setLanguages(request.languages());
        return guideProfileRepository.save(profile);
    }
}
