package com.guidemate.application.service;

import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.persistence.entity.RatingSummaryEntity;
import com.guidemate.infrastructure.persistence.entity.ReviewEntity;
import com.guidemate.infrastructure.persistence.repository.BookingRepository;
import com.guidemate.infrastructure.persistence.repository.RatingSummaryRepository;
import com.guidemate.infrastructure.persistence.repository.ReviewRepository;
import com.guidemate.infrastructure.persistence.repository.UserRepository;
import com.guidemate.presentation.dto.ReviewDtos;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewApplicationService {
    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RatingSummaryRepository ratingSummaryRepository;
    private final RatingCalculationStrategy ratingCalculationStrategy;

    public ReviewApplicationService(ReviewRepository reviewRepository, BookingRepository bookingRepository, UserRepository userRepository, RatingSummaryRepository ratingSummaryRepository, RatingCalculationStrategy ratingCalculationStrategy) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.ratingSummaryRepository = ratingSummaryRepository;
        this.ratingCalculationStrategy = ratingCalculationStrategy;
    }

    @Transactional
    public ReviewDtos.ReviewResponse create(Long userId, ReviewDtos.CreateReviewRequest request) {
        ReviewEntity review = new ReviewEntity();
        review.setBooking(bookingRepository.findById(request.bookingId()).orElseThrow(() -> new NotFoundException("Booking not found")));
        review.setTour(review.getBooking().getTour());
        review.setAuthor(userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found")));
        review.setRating(request.rating());
        review.setComment(request.comment());
        ReviewEntity saved = reviewRepository.save(review);
        updateSummary(saved.getTour().getId());
        return toResponse(saved);
    }

    public List<ReviewDtos.ReviewResponse> list(Long tourId) {
        return reviewRepository.findByTourId(tourId).stream().map(this::toResponse).toList();
    }

    private void updateSummary(Long tourId) {
        List<ReviewEntity> reviews = reviewRepository.findByTourId(tourId);
        RatingSummaryEntity summary = ratingSummaryRepository.findById(tourId).orElseGet(RatingSummaryEntity::new);
        summary.setTourId(tourId);
        summary.setTour(reviews.getFirst().getTour());
        summary.setAverageRating(ratingCalculationStrategy.calculate(reviews));
        summary.setTotalReviews(reviews.size());
        ratingSummaryRepository.save(summary);
    }

    private ReviewDtos.ReviewResponse toResponse(ReviewEntity entity) {
        return new ReviewDtos.ReviewResponse(entity.getId(), entity.getTour().getId(), entity.getAuthor().getFullName(), entity.getRating(), entity.getComment());
    }
}
