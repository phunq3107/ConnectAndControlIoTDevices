package com.phunq.backend.service.entity;

import static com.phunq.backend.security.MyApplicationContext.getCurrentUsername;

import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.controller.dto.CreateIncubationSession;
import com.phunq.backend.exception.CustomForbiddenException;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.dao.GroupDAO;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.entity.FeedType;
import com.phunq.backend.security.MyApplicationContext;

import java.time.LocalDateTime;
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
  private final GroupDAO groupDAO;
  private final FeedGroupService feedGroupService;

  public Feed findFeedById(String feedId) {
    return feedDAO.findById(feedId);
  }

  public Feed save(Feed feed) {
    return feedDAO.makePersistence(feed);
  }

  public Feed save(FeedDto feedDto) {
    FeedGroup feedGroup = groupDAO.findById(feedDto.getGroup().getId());
    if (feedGroup == null) {
      feedGroup = feedGroupService.save(feedDto.getGroup());
    }
    Feed newFeed = new Feed();
    newFeed.setId(feedDto.getId());
    newFeed.setName(feedDto.getName());
    newFeed.setKey(feedDto.getKey());
    newFeed.setCreateAt(feedDto.getCreated_at());
    newFeed.setFeedGroup(feedGroup);
    newFeed.setLastTimeGetData(LocalDateTime.of(1970, 1, 1, 0, 0, 0));

    if (feedDto.getName().contains(FeedType.Light.getCode())) {
      newFeed.setType(FeedType.Light);
    } else if (feedDto.getName().contains(FeedType.Screen.getCode())) {
      newFeed.setType(FeedType.Screen);
    } else if (feedDto.getName().contains(FeedType.SoundSensor.getCode())) {
      newFeed.setType(FeedType.SoundSensor);
    } else if (feedDto.getName().contains(FeedType.TemperatureSensor.getCode())) {
      newFeed.setType(FeedType.TemperatureSensor);
    }

    return save(newFeed);
  }

  public List<Feed> getAllFeedInGroup(String groupKey)
      throws CustomNotFoundException, CustomForbiddenException {
    FeedGroup group = feedGroupService.findByKey(groupKey);
    return group.getFeeds();
  }

  public Feed findByKey(String feedKey) throws CustomNotFoundException, CustomForbiddenException {
    Feed feed = feedDAO.findByKey(feedKey);
    if (feed == null) {
      throw new CustomNotFoundException(String.format("Feed [key=%s] not found", feedKey));
    }
    if (!MyApplicationContext.getCurrentUser().equals(feed.getFeedGroup().getUser())) {
      throw new CustomForbiddenException(
          getCurrentUsername(), String.format("feed [key=%s]", feed.getKey()));
    }
    return feed;
  }

  public Feed findById(String feedId) throws CustomNotFoundException {
    Feed feed = feedDAO.findById(feedId);
    if (feed == null) {
      throw new CustomNotFoundException(String.format("Feed [id=%s] not found", feedId));
    }
    return feed;
  }
}
