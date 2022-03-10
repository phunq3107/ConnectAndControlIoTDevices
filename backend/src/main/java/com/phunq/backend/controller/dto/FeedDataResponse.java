package com.phunq.backend.controller.dto;

import java.time.LocalDateTime;
import lombok.Data;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
@Data
public class FeedDataResponse {

  private String value;
  private LocalDateTime createdAt;

}
