package com.phunq.backend.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class Feed {

  @Id
  private String id;
  private String name;
  @Column(unique = true)
  private String key;
  @Enumerated(EnumType.STRING)
  private FeedType type;
  private String currentValue;
  private LocalDateTime createAt;
  private LocalDateTime lastTimeGetData;

  @ManyToOne
  @JoinColumn(name = "GROUP_ID")
  private FeedGroup feedGroup;

  public boolean isLight() {
    return this.type == FeedType.Light;
  }

  public boolean isScreen() {
    return this.type == FeedType.Screen;
  }

  public boolean isTemperatureSensor() {
    return this.type == FeedType.TemperatureSensor;
  }

  public boolean isSoundSensor() {
    return this.type == FeedType.SoundSensor;
  }

  public Integer getCurrentValueAsInt(){
    return Integer.parseInt(this.currentValue);
  }


}
