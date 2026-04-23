package com.guidemate.application.service;

import com.guidemate.domain.exception.BusinessException;
import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.persistence.entity.RefreshTokenEntity;
import com.guidemate.infrastructure.persistence.entity.RoleName;
import com.guidemate.infrastructure.persistence.entity.UserEntity;
import com.guidemate.infrastructure.persistence.repository.RefreshTokenRepository;
import com.guidemate.infrastructure.persistence.repository.RoleRepository;
import com.guidemate.infrastructure.persistence.repository.UserRepository;
import com.guidemate.infrastructure.security.JwtProperties;
import com.guidemate.infrastructure.security.JwtService;
import com.guidemate.presentation.dto.AuthDtos;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthApplicationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    public AuthApplicationService(UserRepository userRepository, RoleRepository roleRepository, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, JwtProperties jwtProperties) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.jwtProperties = jwtProperties;
    }

    @Transactional
    public void register(AuthDtos.RegisterRequest request) {
        userRepository.findByEmail(request.email()).ifPresent(u -> {
            throw new BusinessException("Email already exists");
        });
        UserEntity user = new UserEntity();
        user.setEmail(request.email());
        user.setFullName(request.fullName());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.getRoles().add(roleRepository.findByName(RoleName.USER).orElseThrow());
        userRepository.save(user);
    }

    @Transactional
    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserEntity user = userRepository.findByEmail(request.email()).orElseThrow(() -> new NotFoundException("User not found"));
        return generateTokens(user);
    }

    @Transactional
    public AuthDtos.AuthResponse refresh(AuthDtos.RefreshRequest request) {
        RefreshTokenEntity tokenEntity = refreshTokenRepository.findByTokenAndRevokedFalse(request.refreshToken())
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                .orElseThrow(() -> new BusinessException("Invalid refresh token"));
        tokenEntity.setRevoked(true);
        return generateTokens(tokenEntity.getUser());
    }

    @Transactional
    public AuthDtos.AuthResponse oauthMockLogin(String email, String fullName) {
        UserEntity user = userRepository.findByEmail(email).orElseGet(() -> {
            UserEntity created = new UserEntity();
            created.setEmail(email);
            created.setFullName(fullName);
            created.setPasswordHash(null);
            created.getRoles().add(roleRepository.findByName(RoleName.USER).orElseThrow());
            return userRepository.save(created);
        });
        return generateTokens(user);
    }

    private AuthDtos.AuthResponse generateTokens(UserEntity user) {
        String access = jwtService.generateAccessToken(user.getEmail(), Map.of("uid", user.getId()));
        String refresh = UUID.randomUUID().toString();
        RefreshTokenEntity refreshToken = new RefreshTokenEntity();
        refreshToken.setUser(user);
        refreshToken.setToken(refresh);
        refreshToken.setExpiresAt(Instant.now().plus(jwtProperties.refreshExpirationDays(), ChronoUnit.DAYS));
        refreshTokenRepository.save(refreshToken);
        return new AuthDtos.AuthResponse(access, refresh, "Bearer");
    }
}
