package com.guidemate.infrastructure.mapper;

import com.guidemate.infrastructure.persistence.entity.TourEntity;
import com.guidemate.presentation.dto.TourDtos;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TourMapper {
    @Mapping(target = "category", source = "category.name")
    @Mapping(target = "city", source = "location.city")
    @Mapping(target = "country", source = "location.country")
    @Mapping(target = "guideName", source = "guide.fullName")
    TourDtos.TourResponse toResponse(TourEntity entity);
}
