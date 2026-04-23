package com.guidemate.presentation.controller;

import com.guidemate.application.service.AuthApplicationService;
import com.guidemate.presentation.ApiV1Paths;
import com.guidemate.presentation.dto.AuthDtos;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/auth")
public class AuthController {
    private final AuthApplicationService authApplicationService;

    public AuthController(AuthApplicationService authApplicationService) {
        this.authApplicationService = authApplicationService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
        authApplicationService.register(request);
    }

    @PostMapping("/login")
    public AuthDtos.AuthResponse login(@Valid @RequestBody AuthDtos.LoginRequest request) {
        return authApplicationService.login(request);
    }

    @PostMapping("/refresh")
    public AuthDtos.AuthResponse refresh(@Valid @RequestBody AuthDtos.RefreshRequest request) {
        return authApplicationService.refresh(request);
    }

    public record OAuthMockRequest(String email, String fullName) {}

    @PostMapping("/oauth/mock")
    public AuthDtos.AuthResponse oauthMock(@RequestBody(required = false) OAuthMockRequest request) {
        String email = request != null && request.email() != null && !request.email().isBlank()
                ? request.email()
                : "google.mock@guidemate.dev";
        String fullName = request != null && request.fullName() != null && !request.fullName().isBlank()
                ? request.fullName()
                : "Google Mock User";
        return authApplicationService.oauthMockLogin(email, fullName);
    }
}
