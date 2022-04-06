package com.phunq.backend.dao;

import com.phunq.backend.entity.FeedValue;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author phunq3107
 * @since 2/23/2022
 */

public interface FeedValueDAO extends GenericDAO<FeedValue, String> {
    public List<FeedValue> getFeedValue(String feedKey, LocalDateTime startTime, LocalDateTime endTime);
}
