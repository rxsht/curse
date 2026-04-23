package com.guidemate.infrastructure.persistence.repository;

import com.guidemate.infrastructure.persistence.entity.TourEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TourRepository extends JpaRepository<TourEntity, Long>, JpaSpecificationExecutor<TourEntity> {
    Page<TourEntity> findByActiveTrue(Pageable pageable);
}
