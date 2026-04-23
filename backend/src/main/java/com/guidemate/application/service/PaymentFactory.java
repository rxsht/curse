package com.guidemate.application.service;

import com.guidemate.infrastructure.persistence.entity.BookingEntity;
import com.guidemate.infrastructure.persistence.entity.PaymentEntity;
import com.guidemate.infrastructure.persistence.entity.PaymentStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PaymentFactory {
    public PaymentEntity createPendingPayment(BookingEntity booking, BigDecimal amount, String provider) {
        PaymentEntity payment = new PaymentEntity();
        payment.setBooking(booking);
        payment.setAmount(amount);
        payment.setProvider(provider);
        payment.setStatus(PaymentStatus.PENDING);
        return payment;
    }
}
