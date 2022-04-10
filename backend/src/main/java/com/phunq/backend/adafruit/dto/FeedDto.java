package com.phunq.backend.adafruit.dto;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Data
public class FeedDto {

  private String id;
  private String name;
  private String description;
  private String last_value;
  private LocalDateTime last_value_at;
  private String license;
  private LocalDateTime created_at;
  private String key;
  private FeedGroupDto group;

  //  @Override
  //  public String toString() {
  //    return "FeedDto{" +
  //        "id='" + id + '\'' +
  //        ", name='" + name + '\'' +
  //        ", key='" + key + '\'' +
  //        '}';
  //  }
}
