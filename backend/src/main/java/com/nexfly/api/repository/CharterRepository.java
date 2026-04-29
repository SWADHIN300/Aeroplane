package com.nexfly.api.repository;

import com.nexfly.api.entity.Charter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharterRepository extends JpaRepository<Charter, Long> {
}
