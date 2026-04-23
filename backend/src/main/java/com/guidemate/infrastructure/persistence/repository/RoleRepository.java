package com.guidemate.infrastructure.persistence.repository;

import com.guidemate.infrastructure.persistence.entity.RoleEntity;
import com.guidemate.infrastructure.persistence.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(RoleName name);
}
