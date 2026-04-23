package com.guidemate.presentation.controller;

import com.guidemate.application.service.PaymentFactory;
import com.guidemate.domain.exception.NotFoundException;
import com.guidemate.infrastructure.persistence.entity.PaymentEntity;
import com.guidemate.infrastructure.persistence.entity.PaymentStatus;
import com.guidemate.infrastructure.persistence.repository.BookingRepository;
import com.guidemate.infrastructure.persistence.repository.PaymentRepository;
import com.guidemate.presentation.ApiV1Paths;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(ApiV1Paths.ROOT + "/payments")
public class PaymentController {
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PaymentFactory paymentFactory;

    public PaymentController(PaymentRepository paymentRepository, BookingRepository bookingRepository, PaymentFactory paymentFactory) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.paymentFactory = paymentFactory;
    }

    public record PayRequest(Long bookingId, @NotBlank String provider) {}

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public Map<String, Object> pay(@RequestBody PayRequest request) {
        var booking = bookingRepository.findById(request.bookingId()).orElseThrow(() -> new NotFoundException("Booking not found"));
        PaymentEntity payment = paymentFactory.createPendingPayment(
                booking,
                booking.getTour().getPrice().multiply(java.math.BigDecimal.valueOf(booking.getParticipants())),
                request.provider()
        );
        payment.setStatus(PaymentStatus.PAID);
        PaymentEntity saved = paymentRepository.save(payment);
        return Map.of("paymentId", saved.getId(), "status", saved.getStatus().name());
    }
}
