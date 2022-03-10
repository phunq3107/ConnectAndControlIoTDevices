package com.phunq.backend.service;

import com.phunq.backend.controller.dto.FeedDataResponse;
import com.phunq.backend.controller.dto.FeedGroupResponse;
import com.phunq.backend.controller.dto.FeedResponse;
import com.phunq.backend.controller.dto.GetUserResponse;
import com.phunq.backend.entity.Feed;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.entity.FeedValue;
import com.phunq.backend.entity.User;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
@Component
public class MapperService {

  @Value("${adafruit.threshold.sound}")
  public Integer soundThreshold;

  public LocalDateTime toLocalDateTime(String time) {
    return LocalDateTime.parse(time, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
  }

  public FeedGroupResponse toFeedGroupResponse(FeedGroup group) {
    FeedGroupResponse response = new FeedGroupResponse();
    response.setKey(group.getKey());
    response.setName(group.getName());
    response.setDescription(group.getDescription());
    response.setNoFeeds(group.getFeeds().size());
    response.setLowerThreshold(group.getLowerTemperatureThreshold());
    response.setUpperThreshold(group.getUpperTemperatureThreshold());
    if (group.getTemperatureSensor() != null
        && group.getTemperatureSensor().getCurrentValue() != null) {
      response.setCurrentTemperature(
          Integer.valueOf(group.getTemperatureSensor().getCurrentValue())
      );
    }
    response.setEnableAutomation(group.getEnableAutomation());
    if (group.getLight() != null && group.getLight().getCurrentValue() != null) {
      response.setLightState(
          Integer.parseInt(group.getLight().getCurrentValue()) > 0
      );
    }
    if (group.getSoundSensor() != null && group.getSoundSensor().getCurrentValue() != null) {
      response.setHatchedEgg(
          Integer.parseInt(group.getSoundSensor().getCurrentValue()) > soundThreshold
      );
    }
    return response;
  }

  public FeedResponse toFeedResponse(Feed feed) {
    FeedResponse response = new FeedResponse();
    response.setName(feed.getName());
    response.setKey(feed.getKey());
    response.setType(feed.getType().name());
    response.setCurrentValue(feed.getCurrentValue());
    return response;
  }

  public FeedDataResponse toFeedDateResponse(FeedValue feedValue) {
    FeedDataResponse response = new FeedDataResponse();
    response.setValue(feedValue.getValue());
    response.setCreatedAt(feedValue.getCreatedAt());
    return response;
  }

  public GetUserResponse toGetUserResponse(User user) {
    return GetUserResponse.builder()
        .username(user.getUsername())
        .fullname(user.getFullname())
        .dob(user.getDob())
        .enable(user.getEnable())
        .groups(
            user.getGroups().stream().map(FeedGroup::getName).collect(Collectors.toList())
        )
        .build();
  }


}
