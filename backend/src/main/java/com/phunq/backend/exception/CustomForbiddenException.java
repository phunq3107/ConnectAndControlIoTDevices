package com.phunq.backend.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CustomForbiddenException extends RuntimeException {

  private String username;
  private String resources;

  public CustomForbiddenException(String username, String resources) {
    this.username = username;
    this.resources = resources;
  }

  @Override
  public String getMessage() {
    return String.format(
        "User [username=%s] doesn't have permission to access %s", username, resources);
  }
}
