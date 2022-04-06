package com.phunq.backend.exception;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
public class CustomNotFoundException extends RuntimeException {
    private final String message;

    public CustomNotFoundException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
