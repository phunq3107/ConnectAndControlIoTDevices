package com.phunq.backend.controller.dto;

import lombok.Data;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
@Data
public class FeedGroupResponse {
  private String key;
  private String name;
  private String description;
  private Integer noFeeds;
  private Integer lowerThreshold;
  private Integer upperThreshold;
  private Integer currentTemperature;
  private Boolean enableAutomation;
  private Boolean lightState;
  private Boolean hatchedEgg;
}
