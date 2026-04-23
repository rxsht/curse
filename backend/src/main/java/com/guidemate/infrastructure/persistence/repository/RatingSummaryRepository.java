package com.guidemate.infrastructure.persistence.repository;

import com.guidemate.infrastructure.persistence.entity.RatingSummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingSummaryRepository extends JpaRepository<RatingSummaryEntity, Long> {
}
