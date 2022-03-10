package com.phunq.backend.entity;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
public enum FeedType {
  Light("LI"), Screen("SC"), TemperatureSensor("TE"), SoundSensor("SO");

  private final String code;

  FeedType(String code) {
    this.code = code;
  }

  public String getCode() {
    return code;
  }
}
