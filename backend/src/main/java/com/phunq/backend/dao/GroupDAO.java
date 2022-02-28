package com.phunq.backend.dao;

import com.phunq.backend.entity.FeedGroup;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
public interface GroupDAO extends GenericDAO<FeedGroup, String> {

  public FeedGroup findByKey(String key);

  public void controlGroupAutomation(String key, Boolean value);
}
