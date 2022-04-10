package com.phunq.backend.exception;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
public class CustomBadRequestException extends RuntimeException {
  private final String message;

  public CustomBadRequestException(String message) {
    this.message = message;
  }

  @Override
  public String getMessage() {
    return message;
  }
}
