package com.phunq.backend.entity;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Entity
@Data
public class Feed {

  @Id
  private String id;
  private String name;
  private String key;
  private LocalDateTime createAt;
  private LocalDateTime lastTimeGetData;

}
