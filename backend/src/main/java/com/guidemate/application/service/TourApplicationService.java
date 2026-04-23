package com.guidemate.application.service;

import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.mapper.TourMapper;
import com.guidemate.infrastructure.persistence.entity.*;
import com.guidemate.infrastructure.persistence.repository.CategoryRepository;
import com.guidemate.infrastructure.persistence.repository.TourRepository;
import com.guidemate.infrastructure.persistence.repository.UserRepository;
import com.guidemate.presentation.dto.TourDtos;
import jakarta.persistence.criteria.Predicate;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
public class TourApplicationService {
    private final TourRepository tourRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TourMapper tourMapper;

    public TourApplicationService(TourRepository tourRepository, CategoryRepository categoryRepository, UserRepository userRepository, TourMapper tourMapper) {
        this.tourRepository = tourRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.tourMapper = tourMapper;
    }

    @Transactional
    public TourDtos.TourResponse create(Long guideId, TourDtos.CreateTourRequest request) {
        UserEntity guide = userRepository.findById(guideId).orElseThrow(() -> new NotFoundException("Guide not found"));
        CategoryEntity category = categoryRepository.findById(request.categoryId()).orElseThrow(() -> new NotFoundException("Category not found"));
        TourEntity tour = new TourEntity();
        tour.setGuide(guide);
        tour.setCategory(category);
        LocationEntity location = new LocationEntity();
        location.setCity(request.city());
        location.setCountry(request.country());
        location.setAddress(request.address());
        if (request.latitude() != null) {
            location.setLatitude(BigDecimal.valueOf(request.latitude()));
        }
        if (request.longitude() != null) {
            location.setLongitude(BigDecimal.valueOf(request.longitude()));
        }
        tour.setLocation(location);
        tour.setTitle(request.title());
        tour.setDescription(request.description());
        tour.setPrice(request.price());
        tour.setDurationHours(request.durationHours());
        tour.setCapacity(request.capacity());
        return toResponse(tourRepository.save(tour));
    }

    @Cacheable(value = "popular-tours", key = "#page + '-' + #size")
    public Page<TourDtos.TourResponse> search(BigDecimal minPrice, BigDecimal maxPrice, Long categoryId, String city, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Specification<TourEntity> specification = (root, query, cb) -> {
            ArrayList<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.isTrue(root.get("active")));
            if (minPrice != null) predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            if (maxPrice != null) predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            if (categoryId != null) predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            if (city != null && !city.isBlank()) predicates.add(cb.equal(cb.lower(root.get("location").get("city")), city.toLowerCase()));
            return cb.and(predicates.toArray(Predicate[]::new));
        };
        return tourRepository.findAll(specification, pageable).map(this::toResponse);
    }

    public TourDtos.TourResponse details(Long id) {
        return tourRepository.findById(id).map(this::toResponse).orElseThrow(() -> new NotFoundException("Tour not found"));
    }

    @Transactional
    public TourDtos.TourResponse update(Long id, TourDtos.UpdateTourRequest request) {
        TourEntity tour = tourRepository.findById(id).orElseThrow(() -> new NotFoundException("Tour not found"));
        if (request.title() != null) tour.setTitle(request.title());
        if (request.description() != null) tour.setDescription(request.description());
        if (request.price() != null) tour.setPrice(request.price());
        if (request.durationHours() != null) tour.setDurationHours(request.durationHours());
        if (request.capacity() != null) tour.setCapacity(request.capacity());
        if (request.active() != null) tour.setActive(request.active());
        return toResponse(tour);
    }

    @Transactional
    public void delete(Long id) {
        tourRepository.deleteById(id);
    }

    private TourDtos.TourResponse toResponse(TourEntity entity) {
        return tourMapper.toResponse(entity);
    }
}
