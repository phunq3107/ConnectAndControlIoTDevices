package com.phunq.backend.resources.dto;

import java.time.LocalDateTime;
import lombok.Builder;
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
  private Integer currentTemperature;
  private Boolean enableAutomation;
  private Boolean lightState;
  private Boolean hatchedEgg;
}
