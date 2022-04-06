package com.phunq.backend.dao;

import com.phunq.backend.entity.Log;

import java.util.List;

public interface LogDAO extends GenericDAO<Log, Long> {

    List<Log> findByUsername(String username);
}
