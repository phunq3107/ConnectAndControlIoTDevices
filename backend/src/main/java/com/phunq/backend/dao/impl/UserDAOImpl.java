package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.UserDAO;
import com.phunq.backend.entity.User;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@Repository
public class UserDAOImpl extends GenericDAOImpl<User, Long> implements UserDAO {

  public UserDAOImpl() {
    super(User.class);
  }

  @Override
  public User findByUsername(String username) {
    try {
      TypedQuery<User> query =
          em.createQuery("select u from  User  u  where  u.username=:username", User.class);
      query.setParameter("username", username);
      return query.getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }
}
