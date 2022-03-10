package com.phunq.backend.service.entity;

import static com.phunq.backend.security.MyApplicationContext.getCurrentUser;
import static com.phunq.backend.security.MyApplicationContext.getCurrentUsername;
import static com.phunq.backend.security.MyApplicationContext.isAdmin;
import static com.phunq.backend.security.MyApplicationContext.isEmployee;

import com.phunq.backend.adafruit.dto.FeedGroupDto;
import com.phunq.backend.controller.dto.SetGroupThresholdRequest;
import com.phunq.backend.controller.exception.CustomForbiddenException;
import com.phunq.backend.controller.exception.CustomNotFoundException;
import com.phunq.backend.dao.GroupDAO;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.entity.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
@Service
public class FeedGroupService {

  @Value("${adafruit.threshold.temperature.lower}")
  private Integer defaultLowerTemperatureThreshold;

  @Value("${adafruit.threshold.temperature.upper}")
  private Integer defaultUpperTemperatureThreshold;

  private final GroupDAO groupDAO;
  private final UserService userService;

  public FeedGroupService(GroupDAO groupDAO, @Lazy UserService userService) {
    this.groupDAO = groupDAO;
    this.userService = userService;
  }

  public FeedGroup save(FeedGroup feedGroup) {
    return groupDAO.makePersistence(feedGroup);
  }


  public FeedGroup save(FeedGroupDto feedGroupDto) {
    FeedGroup feedGroup = new FeedGroup();
    feedGroup.setId(feedGroupDto.getId());
    feedGroup.setName(feedGroupDto.getName());
    feedGroup.setKey(feedGroupDto.getKey());
    feedGroup.setLowerTemperatureThreshold(defaultLowerTemperatureThreshold);
    feedGroup.setUpperTemperatureThreshold(defaultUpperTemperatureThreshold);
    feedGroup.setDescription(feedGroupDto.getDescription());
    feedGroup.setCreatedAt(feedGroupDto.getCreated_at());
    return save(feedGroup);
  }

  public List<FeedGroup> findAll() {
    return groupDAO.findAll();
  }

  public List<FeedGroup> findByUser(String username) {
    return groupDAO.findByUser(username);
  }

  public FeedGroup findByKey(String key) throws CustomNotFoundException, CustomForbiddenException {
    FeedGroup group = groupDAO.findByKey(key);
    if (group == null) {
      throw new CustomNotFoundException(String.format("Group [key=%s] not found", key));
    }
    if (isEmployee() && !getCurrentUser().equals(group.getUser())) {
      throw new CustomForbiddenException(
          getCurrentUsername(), String.format("group [key=%s]", group.getKey())
      );
    }
    return group;
  }


  public FeedGroup findGroupById(String groupId)
      throws CustomNotFoundException, CustomForbiddenException {
    FeedGroup group = groupDAO.findById(groupId);
    if (group == null) {
      throw new CustomNotFoundException(String.format("Group [id=%s] not found", groupId));
    }
    return group;
  }

  public void updateThreshold(String groupKey, SetGroupThresholdRequest request)
      throws CustomNotFoundException, CustomForbiddenException {
    FeedGroup group = findByKey(groupKey);
    if (request.getLower() != null) {
      group.setLowerTemperatureThreshold(request.getLower());
    }
    if (request.getUpper() != null) {
      group.setUpperTemperatureThreshold(request.getUpper());
    }
    save(group);
  }

  public void controlGroupAutomation(String key, Boolean value)
      throws CustomNotFoundException, CustomForbiddenException {
    if (key.equals("%")) {
      List<FeedGroup> groups = groupDAO.findAll();
      for (FeedGroup group : groups) {
        if (isAdmin() || getCurrentUser().equals(group.getUser())) {
          group.setEnableAutomation(value);
          save(group);
        }

      }
    } else {
      FeedGroup group = findByKey(key);
      group.setEnableAutomation(value);
      save(group);
    }
  }

  public void grantPermissionForUserToGroup(String groupKey, String username)
      throws CustomNotFoundException, CustomForbiddenException {
    FeedGroup group = findByKey(groupKey);
    User user = username.equals("none") ? null : userService.findByUsername(username);
    group.setUser(user);
    save(group);
  }

  public void getPermissionBackFromUser(User user) {
    groupDAO.removeUserInGroup(user);
  }


}
