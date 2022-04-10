package com.phunq.backend.service.entity;

import com.phunq.backend.dao.LogDAO;
import com.phunq.backend.entity.ActionType;
import com.phunq.backend.entity.Log;
import com.phunq.backend.security.MyApplicationContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.phunq.backend.entity.ActionType.*;

@Service
@AllArgsConstructor
public class LogService {
  private final LogDAO logDAO;

  public List<Log> findByUsername(String username) {
    return logDAO.findByUsername(username);
  }

  private void createNewLog(ActionType type, String description) {
    Log log = new Log();
    log.setAction(type);
    log.setUsername(MyApplicationContext.getCurrentUsername());
    log.setDescription(description);
    logDAO.makePersistence(log);
  }

  public void createNewIncubationLog(String groupKey) {
    String description = String.format("[On group %s]: Create new incubation session", groupKey);
    createNewLog(CREATE_INCUBATION_SESSION, description);
  }

  public void createControlLightLog(String groupKey, String oldState, String newState) {
    oldState = "0".equals(oldState) ? "close" : "open";
    newState = "0".equals(newState) ? "close" : "open";
    String description =
        String.format("[On group %s]: Control light (%s -> %s)", groupKey, oldState, newState);
    createNewLog(CONTROL_LIGHT, description);
  }

  public void createControlAutomationLog(String groupKey, Boolean oldState, Boolean newState) {
    String description =
        String.format(
            "[On group %s]: Control automation (%s -> %s)",
            groupKey, oldState ? "open" : "close", newState ? "open" : "close");
    createNewLog(CONTROL_AUTOMATION, description);
  }
}
