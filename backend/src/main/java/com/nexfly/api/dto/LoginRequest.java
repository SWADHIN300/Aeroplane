package com.nexfly.api.dto;

public record LoginRequest(
    String email,
    String password
) {}
