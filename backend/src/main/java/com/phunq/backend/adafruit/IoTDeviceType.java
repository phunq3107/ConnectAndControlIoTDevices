package com.phunq.backend.adafruit;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
public enum IoTDeviceType {
  Light("LI"), Screen("SC"), TemperatureSensor("TE"), SoundSensor("SO");

  private final String code;

  IoTDeviceType(String code) {
    this.code = code;
  }

  public String getCode() {
    return code;
  }
}
