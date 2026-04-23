package com.guidemate.presentation.controller;

import com.guidemate.application.service.CurrentUserService;
import com.guidemate.infrastructure.persistence.entity.UserEntity;
import com.guidemate.presentation.ApiV1Paths;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/profile")
public class ProfileController {
    private final CurrentUserService currentUserService;

    public ProfileController(CurrentUserService currentUserService) {
        this.currentUserService = currentUserService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','GUIDE','ADMIN')")
    public UserEntity me() {
        return currentUserService.getCurrent();
    }
}
