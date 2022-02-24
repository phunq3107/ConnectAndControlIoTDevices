package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.entity.Feed;
import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Repository
public class FeedDAOImpl extends GenericDAOImpl<Feed, String> implements FeedDAO {

  public FeedDAOImpl() {
    super(Feed.class);
  }

}
