package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.FeedDAO;
import com.phunq.backend.entity.Feed;

import javax.persistence.TypedQuery;

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

    @Override
    public Feed findByKey(String key) {
        try {
            TypedQuery<Feed> query = em.createQuery(
                    "select f from Feed f where f.key =:key", Feed.class
            );
            query.setParameter("key", key);
            return query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
}
