package com.phunq.backend.dao;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.transaction.Transactional;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
public interface GenericDAO<T, ID extends Serializable> {

  public void setEntityManager(EntityManager em);

  public T makePersistence(T instance);

  public void makeTransient(T instance);

  public T findById(ID id);

  public T findById(ID id, LockModeType lockModeType);

  public T findReferenceById(ID id);

  public List<T> findAll();

  public Long getCount();
}
