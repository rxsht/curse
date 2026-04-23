package com.guidemate.application.service;

import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.persistence.entity.BookingEntity;
import com.guidemate.infrastructure.persistence.entity.BookingStatus;
import com.guidemate.infrastructure.persistence.repository.BookingRepository;
import com.guidemate.infrastructure.persistence.repository.TourRepository;
import com.guidemate.infrastructure.persistence.repository.UserRepository;
import com.guidemate.presentation.dto.BookingDtos;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingApplicationService {
    private final BookingRepository bookingRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private final List<BookingObserver> observers;

    public BookingApplicationService(BookingRepository bookingRepository, TourRepository tourRepository, UserRepository userRepository, List<BookingObserver> observers) {
        this.bookingRepository = bookingRepository;
        this.tourRepository = tourRepository;
        this.userRepository = userRepository;
        this.observers = observers;
    }

    @Transactional
    public BookingDtos.BookingResponse create(Long userId, BookingDtos.CreateBookingRequest request) {
        BookingEntity booking = new BookingEntity();
        booking.setTour(tourRepository.findById(request.tourId()).orElseThrow(() -> new NotFoundException("Tour not found")));
        booking.setTourist(userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found")));
        booking.setParticipants(request.participants());
        booking.setTourDate(request.tourDate());
        BookingEntity saved = bookingRepository.save(booking);
        observers.forEach(observer -> observer.onBookingCreated(saved));
        return toResponse(saved);
    }

    @Transactional
    public void cancel(Long id) {
        BookingEntity booking = bookingRepository.findById(id).orElseThrow(() -> new NotFoundException("Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);
    }

    public List<BookingDtos.BookingResponse> history(Long userId) {
        return bookingRepository.findByTouristId(userId).stream().map(this::toResponse).toList();
    }

    private BookingDtos.BookingResponse toResponse(BookingEntity entity) {
        return new BookingDtos.BookingResponse(
                entity.getId(),
                entity.getTour().getId(),
                entity.getTour().getTitle(),
                entity.getParticipants(),
                entity.getStatus().name(),
                entity.getTourDate()
        );
    }
}
