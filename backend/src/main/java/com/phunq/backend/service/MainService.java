package com.phunq.backend.service;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.adafruit.dto.FeedValueDto;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedGroup;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 2/26/2022
 */
@Service
@Slf4j
public class MainService {

  private final FeedService feedService;
  private final AdafruitService adafruitService;
  private final FeedValueService feedValueService;
  private final FeedGroupService feedGroupService;

  @Value("${adafruit.threshold.sound}")
  public Integer THRESHOLD_SOUND;

  @Value("${adafruit.threshold.temperature.lower}")
  public Integer THRESHOLD_TEMPERATURE_LOWER;

  @Value("${adafruit.threshold.temperature.upper}")
  public Integer THRESHOLD_TEMPERATURE_UPPER;

  public MainService(FeedService feedService,
      AdafruitService adafruitService, FeedValueService feedValueService,
      FeedGroupService feedGroupService) {
    this.feedService = feedService;
    this.adafruitService = adafruitService;
    this.feedValueService = feedValueService;
    this.feedGroupService = feedGroupService;
  }

  public void handleGetFeedsResult(List<FeedDto> feedDtos) throws IOException {
    for (FeedDto feedDto : feedDtos) {
      Feed feed = feedService.findFeedById(feedDto.getId());
      if (feed == null) {
        feed = feedService.addFeed(feedDto);
      }
      if (feedDto.getLast_value_at() != null
          && (feed.getLastTimeGetData().isBefore(feedDto.getLast_value_at())
          || feed.getLastTimeGetData().equals(feedDto.getLast_value_at()))) {
        List<FeedValueDto> feedValueDtos
            = adafruitService.getFeedValues(feed.getId(), feed.getLastTimeGetData());
        Collections.reverse(feedValueDtos);
        for (FeedValueDto feedValueDto : feedValueDtos) {
          feedValueService.addFeedValue(feedValueDto, feed);
        }
        if (feedValueDtos.size() > 0) {
          FeedValueDto lastValue = feedValueDtos.get(feedValueDtos.size() - 1);
          feed.setLastTimeGetData(lastValue.getCreated_at());
          feed.setCurrentValue(lastValue.getValue());
          feedService.save(feed);
          handleAutomationTask(feed);
        }
      }
    }
  }

  public void handleAutomationTask(Feed feed) throws IOException {
    FeedGroup group = feed.getFeedGroup();
    if (!group.getEnableAutomation()) {
      return;
    }
    if (feed.isTemperatureSensor()) {
      int currentTemperature = feed.getCurrentValueAsInt();
      if (currentTemperature < THRESHOLD_TEMPERATURE_LOWER
          && group.getLight().getCurrentValueAsInt() == 0) {
        log.warn(String.format(
            "Automation task [Group %s]: Current temperature (%d) < %d => turn on light",
            group.getName(),
            currentTemperature,
            THRESHOLD_TEMPERATURE_LOWER
        ));
        if (group.getLight() != null) {
          adafruitService.addFeedValue(group.getLight().getKey(), "1");
        }

      } else if (currentTemperature > THRESHOLD_TEMPERATURE_UPPER
          && group.getLight().getCurrentValueAsInt() != 0) {
        log.warn(String.format(
            "Automation task [Group %s]: Current temperature (%d) > %d => turn off light",
            group.getName(),
            currentTemperature,
            THRESHOLD_TEMPERATURE_UPPER
        ));
        if (group.getLight() != null) {
          adafruitService.addFeedValue(group.getLight().getKey(), "0");
        }
      }
    } else if (feed.isSoundSensor()) {
      int currentSound = feed.getCurrentValueAsInt();
      if (currentSound > THRESHOLD_SOUND) {
        log.warn(String.format("Automation task [Group %s]: Have hatched egg", group.getName()));
      }
    }

  }
}
