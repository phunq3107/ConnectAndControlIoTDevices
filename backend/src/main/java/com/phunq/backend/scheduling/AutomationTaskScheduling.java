package com.phunq.backend.scheduling;

import com.phunq.backend.service.AutomationService;
import java.io.IOException;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@Component
@AllArgsConstructor
public class AutomationTaskScheduling {

  private final long interval = 5000L;

  private final AutomationService automationService;

  @Scheduled(fixedRate = interval)
  public void doAutomationTask() throws IOException {
    automationService.doAutomationTask();

  }
}
