package com.phunq.backend.entity;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Entity
@Data
public class FeedValue {
  @Id
  private String id;
  private String value;
  @ManyToOne
  @JoinColumn(name = "FEED_ID")
  private Feed feed;
  private LocalDateTime createdAt;
  private String createdEpoch;
  private LocalDateTime expiration;
}
