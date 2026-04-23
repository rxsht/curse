package com.guidemate.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
public class RefreshTokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @Column(nullable = false, unique = true)
    private String token;
    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;
    private boolean revoked = false;
}
