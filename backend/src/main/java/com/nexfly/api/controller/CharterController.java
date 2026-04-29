package com.nexfly.api.controller;

import com.nexfly.api.entity.Charter;
import com.nexfly.api.service.CharterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/charters")
public class CharterController {

    private final CharterService charterService;

    public CharterController(CharterService charterService) {
        this.charterService = charterService;
    }

    @GetMapping
    public ResponseEntity<List<Charter>> getAllCharters() {
        return ResponseEntity.ok(charterService.getAllCharters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Charter> getCharterById(@PathVariable Long id) {
        return ResponseEntity.ok(charterService.getCharterById(id));
    }
}
