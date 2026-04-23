package com.guidemate.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "guide_profiles")
@Getter
@Setter
public class GuideProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    @Column(columnDefinition = "text")
    private String bio;

    @Column(name = "years_of_experience", nullable = false)
    private Integer yearsOfExperience = 0;

    private String languages;

    private boolean verified = false;
}
