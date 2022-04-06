package com.phunq.backend.dao.impl;

import com.phunq.backend.dao.FeedValueDAO;
import com.phunq.backend.entity.FeedValue;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Repository
public class FeedValueDAOImpl extends GenericDAOImpl<FeedValue, String> implements FeedValueDAO {

    public FeedValueDAOImpl() {
        super(FeedValue.class);
    }

    @Override
    public List<FeedValue> getFeedValue(String feedKey, LocalDateTime startTime,
                                        LocalDateTime endTime) {
        TypedQuery<FeedValue> query = em.createQuery(
                "select v from FeedValue v "
                        + "where v.feed.key = :feedKey "
                        + "and v.createdAt between :startTime and :endTime",
                FeedValue.class);
        query.setParameter("feedKey", feedKey);
        query.setParameter("startTime", startTime);
        query.setParameter("endTime", endTime);
        return query.getResultList();
    }
}
