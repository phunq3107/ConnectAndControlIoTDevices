package com.phunq.backend.resources.dto;

import com.phunq.backend.entity.Feed;
import java.time.LocalDateTime;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
