package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.GenericDAO;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.Transactional;

/**
 * @author phunq3107
 * @since 2/3/2022
 */
@Transactional
public class GenericDAOImpl<T, ID extends Serializable> implements GenericDAO<T, ID> {

    @PersistenceContext
    protected EntityManager em;

    protected final Class<T> entityClass;

    public GenericDAOImpl(Class<T> entityClass) {
        this.entityClass = entityClass;

    }

    @Override
    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    @Override
    public T makePersistence(T instance) {
        return em.merge(instance);
    }

    @Override
    public void makeTransient(T instance) {
        em.remove(instance);
    }


    @Override
    public T findById(ID id) {
        return findById(id, LockModeType.NONE);
    }

    @Override
    public T findById(ID id, LockModeType lockModeType) {
        return em.find(this.entityClass, id, lockModeType);
    }

    @Override
    public T findReferenceById(ID id) {
        return em.getReference(this.entityClass, id);
    }

    @Override
    public List<T> findAll() {
        CriteriaQuery<T> c = em.getCriteriaBuilder().createQuery(this.entityClass);
        c.select(c.from(this.entityClass));
        return em.createQuery(c).getResultList();
    }

    @Override
    public Long getCount() {
        CriteriaQuery<Long> c = em.getCriteriaBuilder().createQuery(Long.class);
        c.select(em.getCriteriaBuilder().count(c.from(this.entityClass)));
        return em.createQuery(c).getSingleResult();
    }
}