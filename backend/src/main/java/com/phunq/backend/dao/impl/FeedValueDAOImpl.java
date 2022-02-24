package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.FeedValueDAO;
import com.phunq.backend.entity.FeedValue;
import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Repository
public class FeedValueDAOImpl extends GenericDAOImpl<FeedValue, String> implements FeedValueDAO {

  public FeedValueDAOImpl() {
    super(FeedValue.class);
  }

}
