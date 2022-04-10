package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.LogDAO;
import com.phunq.backend.entity.Log;
import org.springframework.stereotype.Repository;

import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class LogDAOImpl extends GenericDAOImpl<Log, Long> implements LogDAO {
  public LogDAOImpl() {
    super(Log.class);
  }

  @Override
  public List<Log> findByUsername(String username) {
    TypedQuery<Log> query =
        em.createQuery("select l from Log l where l.username=:username", Log.class);
    query.setParameter("username", username);
    return query.getResultList();
  }
}
