package com.phunq.backend.dao;

import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.entity.User;

import java.util.List;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
public interface GroupDAO extends GenericDAO<FeedGroup, String> {

    public FeedGroup findByKey(String key);

    public List<FeedGroup> findByUser(String username);

    void removeUserInGroup(User user);
}
