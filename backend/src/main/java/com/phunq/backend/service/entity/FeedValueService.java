package com.phunq.backend.service.entity;

import com.phunq.backend.adafruit.dto.FeedValueDto;
import com.phunq.backend.controller.exception.CustomForbiddenException;
import com.phunq.backend.controller.exception.CustomNotFoundException;
import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.dao.FeedValueDAO;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedValue;
import com.phunq.backend.controller.dto.FeedDataResponse;
import com.phunq.backend.service.MapperService;
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

  private final FeedService feedService;
  private final FeedValueDAO feedValueDAO;
  private final MapperService mapperService;

  public FeedValue save(FeedValue feedValue){
    return feedValueDAO.makePersistence(feedValue);
  }

//  public FeedValue addFeedValue(FeedValueDto feedValueDto) throws CustomNotFoundException {
//    if (feedValueDto.getFeed_id() == null) {
//      return null;
//    }
//    Feed feed = feedService.findById(feedValueDto.getFeed_id());
//    if (feed == null) {
//      return null;
//    }
//    return addFeedValue(feedValueDto, feed);
//  }

  public FeedValue addFeedValue(FeedValueDto feedValueDto, Feed feed) {
    FeedValue feedValue = new FeedValue();
    feedValue.setId(feedValueDto.getId());
    feedValue.setValue(feedValueDto.getValue());
    feedValue.setFeed(feed);
    feedValue.setCreatedAt(feedValueDto.getCreated_at());
    feedValue.setExpiration(feedValueDto.getExpiration());
    feedValue.setCreatedEpoch(feedValueDto.getCreated_epoch());
    return save(feedValue);
  }

  public List<FeedValue> findAllByStartAndEndTime(
      String feedKey, LocalDateTime startTime, LocalDateTime endTime)
      throws CustomNotFoundException, CustomForbiddenException {
    feedService.findByKey(feedKey);
    return feedValueDAO.getFeedValue(feedKey, startTime, endTime);
  }

}
