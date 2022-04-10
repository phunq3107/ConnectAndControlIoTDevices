package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.GroupDAO;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.entity.User;

import java.util.List;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
@Repository
public class GroupDAOImpl extends GenericDAOImpl<FeedGroup, String> implements GroupDAO {

  public GroupDAOImpl() {
    super(FeedGroup.class);
  }

  @Override
  public FeedGroup findByKey(String key) {
    try {
      TypedQuery<FeedGroup> query =
          em.createQuery("select g from FeedGroup g where g.key =:key", FeedGroup.class);
      query.setParameter("key", key);
      return query.getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }

  @Override
  public List<FeedGroup> findByUser(String username) {
    TypedQuery<FeedGroup> query =
        em.createQuery(
            "select  g from FeedGroup g where g.user.username = :username", FeedGroup.class);
    query.setParameter("username", username);
    return query.getResultList();
  }

  @Override
  public void removeUserInGroup(User user) {
    Query query = em.createQuery("update FeedGroup g set g.user= null where g.user =:user");
    query.setParameter("user", user);
    query.executeUpdate();
  }
}
