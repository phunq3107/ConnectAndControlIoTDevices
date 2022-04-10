package com.phunq.backend.controller;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.controller.dto.AddFeedDataRequest;
import com.phunq.backend.controller.dto.FeedDataResponse;
import com.phunq.backend.controller.dto.FeedResponse;
import com.phunq.backend.exception.CustomBadRequestException;
import com.phunq.backend.exception.CustomForbiddenException;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.service.MapperService;
import com.phunq.backend.service.entity.FeedService;
import com.phunq.backend.service.entity.FeedValueService;
import com.phunq.backend.service.entity.LogService;
import io.swagger.annotations.ApiParam;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@RestController
@RequestMapping(value = "/api/v1/feeds", produces = "application/json")
@AllArgsConstructor
@Slf4j
public class FeedController {

  private final FeedService feedService;
  private final FeedValueService feedValueService;
  private final MapperService mapperService;

  @GetMapping("/{feedKey}")
  @PreAuthorize("hasAnyRole('EMPLOYEE')")
  public FeedResponse getFeedByKey(@PathVariable String feedKey)
      throws CustomNotFoundException, CustomForbiddenException {
    log.info("__________Get feed by key: " + feedKey);
    return mapperService.toFeedResponse(feedService.findByKey(feedKey));
  }

  @GetMapping("/{feedKey}/data")
  @PreAuthorize("hasAnyRole('EMPLOYEE')")
  public List<FeedDataResponse> getFeedData(
      @PathVariable String feedKey,
      @ApiParam(example = "2021-12-31T12:30:30")
          @RequestParam(name = "start_time", required = false)
          String startTimeParam,
      @ApiParam(example = "2021-12-31T12:30:30") @RequestParam(name = "end_time", required = false)
          String endTimeParam)
      throws CustomBadRequestException, CustomNotFoundException, CustomForbiddenException {
    log.info("__________Get feed data: " + feedKey + " | " + startTimeParam + " | " + endTimeParam);
    LocalDateTime startTime;
    LocalDateTime endTime;
    try {
      if (startTimeParam == null) {
        startTime = LocalDateTime.of(1970, 1, 1, 0, 0, 0);
      } else {
        startTime = mapperService.toLocalDateTime(startTimeParam);
      }
      if (endTimeParam == null) {
        endTime = LocalDateTime.now();
      } else {
        endTime = mapperService.toLocalDateTime(endTimeParam);
      }
    } catch (Exception e) {
      throw new CustomBadRequestException("Bad request");
    }
    return feedValueService.findAllByStartAndEndTime(feedKey, startTime, endTime).stream()
        .map(mapperService::toFeedDateResponse)
        .collect(Collectors.toList());
  }

  @PostMapping("/{feedKey}/data")
  @PreAuthorize("hasAnyRole('EMPLOYEE')")
  public void addFeedData(@PathVariable String feedKey, @RequestBody AddFeedDataRequest body)
      throws IOException {
    log.info("__________Add feed data: " + feedKey + " | " + body);
    feedValueService.addFeedValue(feedKey, body.getValue());
  }
}
