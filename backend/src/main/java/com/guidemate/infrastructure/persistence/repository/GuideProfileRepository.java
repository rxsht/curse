package com.guidemate.infrastructure.persistence.repository;

import com.guidemate.infrastructure.persistence.entity.GuideProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuideProfileRepository extends JpaRepository<GuideProfileEntity, Long> {
    Optional<GuideProfileEntity> findByUserId(Long userId);
}
