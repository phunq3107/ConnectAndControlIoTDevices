package com.phunq.backend.service;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.adafruit.dto.FeedValueDto;
import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.dao.FeedValueDAO;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedValue;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Service
@AllArgsConstructor
public class FeedService {

  private final FeedDAO feedDAO;
  private final FeedValueDAO feedValueDAO;
  private final AdafruitService adafruitService;


  public void handleGetFeedsResult(List<FeedDto> feedDtos) throws IOException {
    for (FeedDto feedDto : feedDtos) {
      Feed feed = feedDAO.findById(feedDto.getId());
      if (feed == null) {
        feed = addFeed(feedDto);
      }
      if (feedDto.getLast_value_at() != null
          && (feed.getLastTimeGetData().isBefore(feedDto.getLast_value_at())
      ||feed.getLastTimeGetData().equals(feedDto.getLast_value_at()))) {
        List<FeedValueDto> feedValueDtos
            = adafruitService.getFeedValues(feed.getId(), feed.getLastTimeGetData());
        Collections.reverse(feedValueDtos);
        for (FeedValueDto feedValueDto: feedValueDtos){
          addFeedValue(feedValueDto, feed);
        }
        if(feedValueDtos.size()>0){
          feed.setLastTimeGetData(feedValueDtos.get(feedValueDtos.size()-1).getCreated_at());
          feedDAO.makePersistence(feed);
        }
      }
    }
  }


  public Feed addFeed(FeedDto feedDto) {
    Feed newFeed = new Feed();
    newFeed.setId(feedDto.getId());
    newFeed.setName(feedDto.getName());
    newFeed.setKey(feedDto.getKey());
    newFeed.setCreateAt(feedDto.getCreated_at());
    newFeed.setLastTimeGetData(LocalDateTime.of(1970, 1, 1, 0, 0, 0));
    return feedDAO.makePersistence(newFeed);
  }

  public FeedValue addFeedValue(FeedValueDto feedValueDto) {
    if (feedValueDto.getFeed_id() == null) {
      return null;
    }
    Feed feed = feedDAO.findById(feedValueDto.getFeed_id());
    if (feed == null) {
      return null;
    }
    return addFeedValue(feedValueDto, feed);
  }

  public FeedValue addFeedValue(FeedValueDto feedValueDto, Feed feed) {
    FeedValue feedValue = new FeedValue();
    feedValue.setId(feedValueDto.getId());
    feedValue.setValue(feedValueDto.getValue());
    feedValue.setFeed(feed);
    feedValue.setCreatedAt(feedValueDto.getCreated_at());
    feedValue.setExpiration(feedValueDto.getExpiration());
    feedValue.setCreatedEpoch(feedValueDto.getCreated_epoch());

    return feedValueDAO.makePersistence(feedValue);
  }

}
