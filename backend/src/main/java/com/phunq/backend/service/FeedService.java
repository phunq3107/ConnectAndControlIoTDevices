package com.phunq.backend.service;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.adafruit.IoTDeviceType;
import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.dao.GroupDAO;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.Feed.FeedType;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.resources.dto.FeedResponse;
import com.phunq.backend.util.MyMapperUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
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
  private final GroupDAO groupDAO;
  private final FeedValueService feedValueService;
  private final FeedGroupService feedGroupService;
  private final AdafruitService adafruitService;
  private final MyMapperUtil myMapperUtil;

  public Feed findFeedById(String feedId) {
    return feedDAO.findById(feedId);
  }

  public Feed save(Feed feed) {
    return feedDAO.makePersistence(feed);
  }


  public Feed addFeed(FeedDto feedDto) {
    FeedGroup feedGroup = groupDAO.findById(feedDto.getGroup().getId());
    if (feedGroup == null) {
      feedGroup = feedGroupService.addFeedGroup(feedDto.getGroup());
    }
    Feed newFeed = new Feed();
    newFeed.setId(feedDto.getId());
    newFeed.setName(feedDto.getName());
    newFeed.setKey(feedDto.getKey());
    newFeed.setCreateAt(feedDto.getCreated_at());
    newFeed.setFeedGroup(feedGroup);
    newFeed.setLastTimeGetData(LocalDateTime.of(1970, 1, 1, 0, 0, 0));

    if (feedDto.getName().contains(IoTDeviceType.Light.getCode())) {
      newFeed.setType(FeedType.Light);
    } else if (feedDto.getName().contains(IoTDeviceType.Screen.getCode())) {
      newFeed.setType(FeedType.Screen);
    } else if (feedDto.getName().contains(IoTDeviceType.SoundSensor.getCode())) {
      newFeed.setType(FeedType.SoundSensor);
    } else if (feedDto.getName().contains(IoTDeviceType.TemperatureSensor.getCode())) {
      newFeed.setType(FeedType.TemperatureSensor);
    }

    return feedDAO.makePersistence(newFeed);
  }

  public List<FeedResponse> getAllFeedInGroup(String groupKey) throws CustomNotFoundException {
    FeedGroup group = groupDAO.findByKey(groupKey);
    if (group == null) {
      throw new CustomNotFoundException(String.format("Group [key=%s] not found", groupKey));
    }
    return group.getFeeds().stream()
        .map(myMapperUtil::toFeedResponse)
        .collect(Collectors.toList());
  }


  public FeedResponse getFeedByKey(String feedKey) throws CustomNotFoundException {
    Feed feed = feedDAO.findByKey(feedKey);
    if (feed == null) {
      throw new CustomNotFoundException(String.format("Feed [key=%s] not found", feedKey));
    }
    return myMapperUtil.toFeedResponse(feed);
  }

  public FeedResponse getFeedById(String feedId) throws CustomNotFoundException {
    Feed feed = feedDAO.findById(feedId);
    if (feed == null) {
      throw new CustomNotFoundException(String.format("Feed [id=%s] not found", feedId));
    }
    return myMapperUtil.toFeedResponse(feed);
  }
}
