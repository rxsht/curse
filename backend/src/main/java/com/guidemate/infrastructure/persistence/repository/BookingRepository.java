package com.guidemate.infrastructure.persistence.repository;

import com.guidemate.infrastructure.persistence.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByTouristId(Long touristId);
}
