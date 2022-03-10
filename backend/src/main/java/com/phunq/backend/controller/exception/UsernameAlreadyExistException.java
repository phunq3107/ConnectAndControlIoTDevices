package com.phunq.backend.controller.exception;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
public class UsernameAlreadyExistException extends Exception {

  private String username;

  public UsernameAlreadyExistException(String username) {
    this.username = username;
  }

  @Override
  public String getMessage() {
    return String.format("Username [%s] already exists", username);
  }
}
