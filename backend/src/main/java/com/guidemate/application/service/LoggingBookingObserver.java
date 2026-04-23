package com.guidemate.application.service;

import com.guidemate.infrastructure.persistence.entity.BookingEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class LoggingBookingObserver implements BookingObserver {
    private static final Logger log = LoggerFactory.getLogger(LoggingBookingObserver.class);

    @Override
    public void onBookingCreated(BookingEntity booking) {
        log.info("Booking created id={} tour={} user={}", booking.getId(), booking.getTour().getId(), booking.getTourist().getId());
    }
}
