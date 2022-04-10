package com.phunq.backend.controller;

import com.phunq.backend.controller.dto.AddUserRequest;
import com.phunq.backend.controller.dto.GetUserResponse;
import com.phunq.backend.controller.dto.UpdateUserRequest;
import com.phunq.backend.exception.CustomBadRequestException;
import com.phunq.backend.exception.CustomForbiddenException;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.exception.UsernameAlreadyExistException;
import com.phunq.backend.security.MyApplicationContext;
import com.phunq.backend.service.MapperService;
import com.phunq.backend.service.entity.UserService;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
@RequestMapping(value = "/api/v1/accounts", produces = "application/json")
@AllArgsConstructor
@Slf4j
public class AccountController {

  private final UserService userService;
  private final MapperService mapperService;

  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public List<GetUserResponse> getAll() {
    log.info("__________Get all users: ");
    return userService.findAll().stream()
        .map(mapperService::toGetUserResponse)
        .collect(Collectors.toList());
  }

  @GetMapping("/{username}")
  @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
  public GetUserResponse getByUsername(@PathVariable String username)
      throws CustomNotFoundException {
    log.info("__________Get user by username: " + username);
    return mapperService.toGetUserResponse(userService.findByUsername(username));
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public void addAccount(@RequestBody AddUserRequest addUserRequest)
      throws UsernameAlreadyExistException {
    log.info("__________Add new user: " + addUserRequest);
    userService.addUser(addUserRequest.getUsername(), addUserRequest.getPassword());
  }

  @PatchMapping("/{username}")
  @PreAuthorize("hasAnyRole('EMPLOYEE')")
  public GetUserResponse updateAccount(
      @PathVariable String username, @RequestBody UpdateUserRequest body) {
    log.info("__________Update user: " + username + " | " + body);
    if (MyApplicationContext.isEmployee()
        && !MyApplicationContext.getCurrentUsername().equals(username)) {
      throw new CustomForbiddenException(
          MyApplicationContext.getCurrentUsername(),
          String.format("update [username=%s]", username));
    }

    return mapperService.toGetUserResponse(userService.updateUser(username, body));
  }

  @DeleteMapping("/{username}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public void deleteAccount(@PathVariable String username)
      throws CustomNotFoundException, CustomBadRequestException {
    log.info("__________Delete user: " + username);
    if (username == null || username.equals("admin")) {
      throw new CustomBadRequestException("");
    }
    userService.disableUser(username);
  }

  @PostMapping("/{username}/reset")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public String resetPassword(@PathVariable String username) {
    log.info("__________Reset password: " + username);
    return userService.resetPassword(username);
  }
}
