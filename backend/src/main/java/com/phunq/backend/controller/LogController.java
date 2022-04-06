package com.phunq.backend.controller;

import com.phunq.backend.entity.Log;
import com.phunq.backend.exception.CustomForbiddenException;
import com.phunq.backend.security.MyApplicationContext;
import com.phunq.backend.service.entity.LogService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/log")
@AllArgsConstructor
@Slf4j
public class LogController {

    private final LogService logService;

    @GetMapping("/{username}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public List<Log> getLogByUsername(@PathVariable String username) {
        log.info("__________Get log: "+username);
        if (MyApplicationContext.isEmployee() && !MyApplicationContext.getCurrentUsername().equals(username)) {
            throw new CustomForbiddenException(
                    MyApplicationContext.getCurrentUsername(), String.format("log [username=%s]", username)
            );
        }
        return logService.findByUsername(username);
    }
}
