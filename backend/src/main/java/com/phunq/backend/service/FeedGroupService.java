package com.phunq.backend.service;

import com.phunq.backend.adafruit.dto.FeedGroupDto;
import com.phunq.backend.dao.GroupDAO;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.resources.dto.FeedGroupResponse;
import com.phunq.backend.util.MyMapperUtil;
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
public class FeedGroupService {

  private final GroupDAO groupDAO;
  private final MyMapperUtil myMapperUtil;

  public FeedGroup save(FeedGroup feedGroup) {
    return groupDAO.makePersistence(feedGroup);
  }


  public FeedGroup addFeedGroup(FeedGroupDto feedGroupDto) {
    FeedGroup feedGroup = new FeedGroup();
    feedGroup.setId(feedGroupDto.getId());
    feedGroup.setName(feedGroupDto.getName());
    feedGroup.setKey(feedGroupDto.getKey());
    feedGroup.setDescription(feedGroupDto.getDescription());
    feedGroup.setCreatedAt(feedGroupDto.getCreated_at());
    return groupDAO.makePersistence(feedGroup);
  }

  public FeedGroupResponse getGroupByKey(String key) throws CustomNotFoundException {
    FeedGroup group = groupDAO.findByKey(key);
    if (group == null) {
      throw new CustomNotFoundException(String.format("Group [key=%s] not found", key));
    }
    return myMapperUtil.toFeedGroupResponse(group);
  }

  public List<FeedGroupResponse> getAllGroup() {
    return groupDAO.findAll().stream()
        .map(myMapperUtil::toFeedGroupResponse)
        .collect(Collectors.toList());
  }

  public FeedGroupResponse getGroupById(String groupId) throws CustomNotFoundException {
    FeedGroup group = groupDAO.findById(groupId);
    if (group == null) {
      throw new CustomNotFoundException(String.format("Group [id=%s] not found", groupId));
    }
    return myMapperUtil.toFeedGroupResponse(group);
  }

  public void controlGroupAutomation(String key, Boolean value) {
    groupDAO.controlGroupAutomation(key, value);

  }
}
