package com.guidemate.infrastructure.mapper;

import com.guidemate.infrastructure.persistence.entity.CategoryEntity;
import com.guidemate.infrastructure.persistence.entity.LocationEntity;
import com.guidemate.infrastructure.persistence.entity.TourEntity;
import com.guidemate.infrastructure.persistence.entity.UserEntity;
import com.guidemate.presentation.dto.TourDtos;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-23T17:29:46+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class TourMapperImpl implements TourMapper {

    @Override
    public TourDtos.TourResponse toResponse(TourEntity entity) {
        if ( entity == null ) {
            return null;
        }

        String category = null;
        String city = null;
        String country = null;
        String guideName = null;
        Long id = null;
        String title = null;
        String description = null;
        BigDecimal price = null;
        Integer durationHours = null;
        Integer capacity = null;

        category = entityCategoryName( entity );
        city = entityLocationCity( entity );
        country = entityLocationCountry( entity );
        guideName = entityGuideFullName( entity );
        id = entity.getId();
        title = entity.getTitle();
        description = entity.getDescription();
        price = entity.getPrice();
        durationHours = entity.getDurationHours();
        capacity = entity.getCapacity();

        TourDtos.TourResponse tourResponse = new TourDtos.TourResponse( id, title, description, price, durationHours, capacity, category, city, country, guideName );

        return tourResponse;
    }

    private String entityCategoryName(TourEntity tourEntity) {
        if ( tourEntity == null ) {
            return null;
        }
        CategoryEntity category = tourEntity.getCategory();
        if ( category == null ) {
            return null;
        }
        String name = category.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String entityLocationCity(TourEntity tourEntity) {
        if ( tourEntity == null ) {
            return null;
        }
        LocationEntity location = tourEntity.getLocation();
        if ( location == null ) {
            return null;
        }
        String city = location.getCity();
        if ( city == null ) {
            return null;
        }
        return city;
    }

    private String entityLocationCountry(TourEntity tourEntity) {
        if ( tourEntity == null ) {
            return null;
        }
        LocationEntity location = tourEntity.getLocation();
        if ( location == null ) {
            return null;
        }
        String country = location.getCountry();
        if ( country == null ) {
            return null;
        }
        return country;
    }

    private String entityGuideFullName(TourEntity tourEntity) {
        if ( tourEntity == null ) {
            return null;
        }
        UserEntity guide = tourEntity.getGuide();
        if ( guide == null ) {
            return null;
        }
        String fullName = guide.getFullName();
        if ( fullName == null ) {
            return null;
        }
        return fullName;
    }
}
