package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.GroupDAO;
import com.phunq.backend.entity.FeedGroup;
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
      TypedQuery<FeedGroup> query = em.createQuery(
          "select g from FeedGroup g where g.key =:key", FeedGroup.class
      );
      query.setParameter("key", key);
      return query.getSingleResult();
    } catch (Exception e) {
      return null;
    }
  }

  @Override
  public void controlGroupAutomation(String key, Boolean value) {
    Query query = em.createQuery(
        "update FeedGroup set enableAutomation = :value where key like :key");
    query.setParameter("key", key);
    query.setParameter("value", value);
    query.executeUpdate();
  }
}
