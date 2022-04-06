package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.ThresholdDAO;
import com.phunq.backend.entity.TemperatureThreshold;
import org.springframework.stereotype.Repository;

@Repository
public class ThresholdDAOImpl extends GenericDAOImpl<TemperatureThreshold, Integer> implements ThresholdDAO {
    public ThresholdDAOImpl() {
        super(TemperatureThreshold.class);
    }
}

