package com.phunq.backend.service.entity;

import com.phunq.backend.dao.ThresholdDAO;
import com.phunq.backend.entity.TemperatureThreshold;
import com.phunq.backend.exception.CustomNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ThresholdService {
  private final ThresholdDAO thresholdDAO;

  public void save(TemperatureThreshold threshold) {
    thresholdDAO.makePersistence(threshold);
  }

  public TemperatureThreshold findById(Integer id) {
    TemperatureThreshold threshold = thresholdDAO.findById(id);
    if (threshold == null) {
      throw new CustomNotFoundException(String.format("Threshold [id=%d] is not exist", id));
    }
    return threshold;
  }

  public List<TemperatureThreshold> findAll() {
    return thresholdDAO.findAll();
  }
}
