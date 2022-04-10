package com.phunq.backend.adafruit.dto;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Data
public class FeedGroupDto {
  private String id;
  private String key;
  private String name;
  private String description;
  private LocalDateTime created_at;
}
