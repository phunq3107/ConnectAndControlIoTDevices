package com.phunq.backend.resources;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.exception.CustomBadRequestException;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.resources.dto.AddFeedDataRequest;
import com.phunq.backend.resources.dto.ControlAutomationRequest;
import com.phunq.backend.resources.dto.FeedDataResponse;
import com.phunq.backend.resources.dto.FeedGroupResponse;
import com.phunq.backend.resources.dto.FeedResponse;
import com.phunq.backend.service.FeedGroupService;
import com.phunq.backend.service.FeedService;
import com.phunq.backend.service.FeedValueService;
import com.phunq.backend.util.MyMapperUtil;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class ResourceController {

  private final FeedService feedService;
  private final FeedGroupService feedGroupService;
  private final FeedValueService feedValueService;
  private final MyMapperUtil myMapperUtil;
  private final AdafruitService adafruitService;

//  @GetMapping("/test")
//  public void test() throws IOException {
//    adafruitService.addFeedValue("g01.g01-li","35");
//  }

  @GetMapping("/group")
  public List<FeedGroupResponse> getAllGroup() {
    return feedGroupService.getAllGroup();
  }

  @GetMapping("/group/{groupKey}")
  public FeedGroupResponse getGroupById(@PathVariable String groupKey)
      throws CustomNotFoundException {
    return feedGroupService.getGroupByKey(groupKey);
  }

  @GetMapping("/group/{groupKey}/feed")
  public List<FeedResponse> getAllFeedInGroup(@PathVariable String groupKey)
      throws CustomNotFoundException {
    return feedService.getAllFeedInGroup(groupKey);
  }

  @GetMapping("/feed/{feedKey}")
  public FeedResponse getFeedByKey(@PathVariable String feedKey)
      throws CustomNotFoundException {
    return feedService.getFeedByKey(feedKey);
  }

  @GetMapping("/feed/{feedKey}/data")
  public List<FeedDataResponse> getFeedData(@PathVariable String feedKey,
      @ApiParam(example = "2021-12-31T12:30:30")
      @RequestParam(name = "start_time", required = false) String startTimeParam,
      @ApiParam(example = "2021-12-31T12:30:30")
      @RequestParam(name = "end_time", required = false) String endTimeParam)
      throws CustomBadRequestException {
    LocalDateTime startTime;
    LocalDateTime endTime;
    try {
      if (startTimeParam == null) {
        startTime = LocalDateTime.of(1970, 1, 1, 0, 0, 0);
      } else {
        startTime = myMapperUtil.toLocalDateTime(startTimeParam);
      }
      if (endTimeParam == null) {
        endTime = LocalDateTime.now();
      } else {
        endTime = myMapperUtil.toLocalDateTime(endTimeParam);
      }
    } catch (Exception e) {
      throw new CustomBadRequestException("Bad request");
    }
    return feedValueService.getFeedValue(feedKey, startTime, endTime);
  }

  @PostMapping("/feed/{feedKey}/data")
  public void addFeedData(@PathVariable String feedKey, @RequestBody AddFeedDataRequest body)
      throws IOException {
    adafruitService.addFeedValue(feedKey, body.getValue());
  }

  @PostMapping("/group/automation")
  void controlGroupAutomation(@RequestBody ControlAutomationRequest body)
      throws CustomBadRequestException {
    if(body.getValue() == null || body.getKey() ==null){
      throw  new CustomBadRequestException("");
    }
    feedGroupService.controlGroupAutomation(body.getKey(), body.getValue());

  }
}
