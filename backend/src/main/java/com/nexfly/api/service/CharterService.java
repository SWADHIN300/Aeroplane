package com.nexfly.api.service;

import com.nexfly.api.entity.Charter;
import com.nexfly.api.exception.ResourceNotFoundException;
import com.nexfly.api.repository.CharterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharterService {

    private final CharterRepository charterRepository;

    public CharterService(CharterRepository charterRepository) {
        this.charterRepository = charterRepository;
    }

    public List<Charter> getAllCharters() {
        return charterRepository.findAll();
    }

    public Charter getCharterById(Long id) {
        return charterRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Charter not found with id: " + id));
    }
}
