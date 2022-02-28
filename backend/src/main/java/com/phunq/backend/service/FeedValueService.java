package com.phunq.backend.service;

import com.phunq.backend.adafruit.dto.FeedValueDto;
import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.dao.FeedValueDAO;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedValue;
import com.phunq.backend.resources.dto.FeedDataResponse;
import com.phunq.backend.util.MyMapperUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
@Service
@AllArgsConstructor
public class FeedValueService {

  private final FeedDAO feedDAO;
  private final FeedValueDAO feedValueDAO;
  private final MyMapperUtil myMapperUtil;

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

  public List<FeedDataResponse> getFeedValue(
      String feedKey, LocalDateTime startTime, LocalDateTime endTime) {
    return feedValueDAO.getFeedValue(feedKey, startTime, endTime)
        .stream().map(myMapperUtil::toFeedDateResponse)
        .collect(Collectors.toList());
  }

}
