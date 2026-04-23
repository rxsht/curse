package com.guidemate.application.service;

import com.guidemate.infrastructure.persistence.entity.BookingEntity;

public interface BookingObserver {
    void onBookingCreated(BookingEntity booking);
}
