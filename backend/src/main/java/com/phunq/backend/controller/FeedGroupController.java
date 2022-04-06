package com.phunq.backend.controller;

import static com.phunq.backend.security.MyApplicationContext.getCurrentUser;
import static com.phunq.backend.security.MyApplicationContext.isAdmin;

import com.phunq.backend.controller.dto.*;
import com.phunq.backend.entity.TemperatureThreshold;
import com.phunq.backend.exception.CustomBadRequestException;
import com.phunq.backend.exception.CustomForbiddenException;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.entity.FeedGroup;
import com.phunq.backend.service.MapperService;
import com.phunq.backend.service.entity.FeedGroupService;
import com.phunq.backend.service.entity.FeedService;

import java.util.List;
import java.util.stream.Collectors;

import com.phunq.backend.service.entity.ThresholdService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@RestController
@RequestMapping(value = "/api/v1/groups", produces = "application/json")
@AllArgsConstructor
@Slf4j
public class FeedGroupController {

    private final FeedService feedService;
    private final FeedGroupService feedGroupService;
    private final MapperService mapperService;
    private final ThresholdService thresholdService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public List<FeedGroupResponse> getAllGroup() {
        log.info("__________Get all groups");
        List<FeedGroup> groups;
        if (isAdmin()) {
            groups = feedGroupService.findAll();
        } else {
            groups = feedGroupService.findByUser(getCurrentUser().getUsername());
        }
        return groups.stream().map(mapperService::toFeedGroupResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{groupKey}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public FeedGroupResponse getGroupByKey(@PathVariable String groupKey)
            throws CustomNotFoundException, CustomForbiddenException {
        log.info("__________Get group: " + groupKey);
        return mapperService.toFeedGroupResponse(feedGroupService.findByKey(groupKey));
    }

    @GetMapping("/{groupKey}/feeds")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public List<FeedResponse> getAllFeedInGroup(@PathVariable String groupKey)
            throws CustomNotFoundException, CustomForbiddenException {
        log.info("__________Get all feeds in group: " + groupKey);
        return feedService.getAllFeedInGroup(groupKey)
                .stream().map(mapperService::toFeedResponse)
                .collect(Collectors.toList());
    }

    @PostMapping("/automation")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    void controlGroupAutomation(@RequestBody ControlAutomationRequest body)
            throws CustomBadRequestException, CustomNotFoundException, CustomForbiddenException {
        log.info("__________Control automation: " + body);
        if (body.getValue() == null || body.getKey() == null) {
            throw new CustomBadRequestException("[value] and [key] must be not empty");
        }
        feedGroupService.controlGroupAutomation(body.getKey(), body.getValue());
    }

    @GetMapping("/threshold")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    public List<TemperatureThreshold> getAllThreshold() {
        return thresholdService.findAll();
    }

//    @PostMapping("/{groupKey}/threshold")
//    @PreAuthorize("hasAnyRole('EMPLOYEE')")
//    void setGroupThreshold(@PathVariable String groupKey,
//                           @RequestBody SetGroupThresholdRequest body)
//            throws CustomNotFoundException, CustomForbiddenException {
//        log.info("__________Update threshold: " + groupKey + " | " + body);
//
////        feedGroupService.updateThreshold(groupKey, body);
//    }

    @PostMapping("/{groupKey}/session")
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    void createNewIncubationSession(@PathVariable String groupKey,
                                    @RequestBody CreateIncubationSession body)
            throws CustomNotFoundException, CustomForbiddenException {
        log.info("__________Create new incubation session: " + groupKey + " | " + body);
        feedGroupService.createNewIncubationSession(groupKey, body);
//        feedGroupService.updateThreshold(groupKey, body);
    }

    @PostMapping("/{groupKey}/grant")
    @PreAuthorize("hasAnyRole('ADMIN')")
    void grantPermissionToUser(@PathVariable String groupKey,
                               @RequestBody GrantPermissionToUserRequest body)
            throws CustomNotFoundException, CustomForbiddenException {
        log.info("__________Grant permission: " + groupKey + " | " + body);
        feedGroupService.grantPermissionForUserToGroup(groupKey, body.getUsername());

    }


}
