package com.phunq.backend.resources.dto;

import com.phunq.backend.entity.Feed.FeedType;
import java.time.LocalDateTime;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
@Data
public class FeedResponse {

  private String key;
  private String name;
  private String type;
  private String currentValue;


}
