package com.phunq.backend.service;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.adafruit.dto.FeedValueDto;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedType;
import com.phunq.backend.service.entity.FeedService;
import com.phunq.backend.service.entity.FeedValueService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@Service
@AllArgsConstructor
public class HandleResponseService {

  private final FeedService feedService;
  private final AdafruitService adafruitService;
  private final FeedValueService feedValueService;

  public void handleGetFeedsResult(List<FeedDto> feedDtos) throws IOException {
    for (FeedDto feedDto : feedDtos) {
      Feed feed = feedService.findFeedById(feedDto.getId());
      if (feed == null) {
        feed = feedService.save(feedDto);
      }
      if (feedDto.getName().contains(FeedType.Screen.getCode())) {
        continue;
      }
      if (feedDto.getLast_value_at() != null
          && (feed.getLastTimeGetData().isBefore(feedDto.getLast_value_at())
              || feed.getLastTimeGetData().equals(feedDto.getLast_value_at()))) {
        List<FeedValueDto> feedValueDtos =
            adafruitService.getFeedValues(feed.getId(), feed.getLastTimeGetData());
        Collections.reverse(feedValueDtos);
        for (FeedValueDto feedValueDto : feedValueDtos) {
          feedValueService.addFeedValue(feedValueDto, feed);
        }
        if (feedValueDtos.size() > 0) {
          FeedValueDto lastValue = feedValueDtos.get(feedValueDtos.size() - 1);
          feed.setLastTimeGetData(lastValue.getCreated_at());
          feed.setCurrentValue(lastValue.getValue());
          feedService.save(feed);
        }
      }
    }
  }
}
