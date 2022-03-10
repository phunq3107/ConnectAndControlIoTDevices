package com.phunq.backend.controller.exception;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
public class CustomNotFoundException extends Exception{
  private final String message;

  public CustomNotFoundException(String message) {
    this.message = message;
  }

  @Override
  public String getMessage() {
    return message;
  }
}
