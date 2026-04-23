package com.guidemate.application.service;

import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.persistence.entity.UserEntity;
import com.guidemate.infrastructure.persistence.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {
    private final UserRepository userRepository;

    public CurrentUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getCurrent() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Current user not found"));
    }
}
