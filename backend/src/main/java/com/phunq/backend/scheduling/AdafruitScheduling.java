package com.phunq.backend.scheduling;

import com.phunq.backend.adafruit.AdafruitService;
import com.phunq.backend.adafruit.dto.FeedDto;
import com.phunq.backend.service.AutomationService;
import com.phunq.backend.service.HandleResponseService;

import java.io.IOException;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Component
@PropertySource("classpath:env.properties")
@AllArgsConstructor
@Slf4j
public class AdafruitScheduling {

  private final long interval = 5000L;

  private final AdafruitService adafruitService;
  private final HandleResponseService handleResponseService;

  @Scheduled(fixedRate = interval)
  void getFeedFromAdafruitServer() throws IOException {
    List<FeedDto> feeds = adafruitService.getAllFeeds();
    handleResponseService.handleGetFeedsResult(feeds);
  }
}
