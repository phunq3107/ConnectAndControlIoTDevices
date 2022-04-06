package com.phunq.backend.exception;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
public class UsernameAlreadyExistException extends RuntimeException {

    private String username;

    public UsernameAlreadyExistException(String username) {
        this.username = username;
    }

    @Override
    public String getMessage() {
        return String.format("Username [%s] already exists", username);
    }
}
