package com.phunq.backend.dao;

import com.phunq.backend.entity.User;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
public interface UserDAO extends GenericDAO<User, Long> {
  public User findByUsername(String username);
}
