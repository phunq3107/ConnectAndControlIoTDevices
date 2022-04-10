package com.phunq.backend.service.entity;

import com.phunq.backend.controller.dto.UpdateUserRequest;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.exception.UsernameAlreadyExistException;
import com.phunq.backend.dao.UserDAO;
import com.phunq.backend.entity.User;
import com.phunq.backend.entity.UserRole;

import java.util.List;

import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

  private final UserDAO userDAO;
  private final FeedGroupService groupService;
  private final PasswordEncoder passwordEncoder;

  public User save(User user) {
    return userDAO.makePersistence(user);
  }

  public User addUser(User user) throws UsernameAlreadyExistException {
    User obj = userDAO.findByUsername(user.getUsername());
    if (obj != null) {
      throw new UsernameAlreadyExistException(user.getUsername());
    }
    return save(user);
  }

  public User addUser(String username, String password) throws UsernameAlreadyExistException {
    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole(UserRole.EMPLOYEE);
    return addUser(user);
  }

  public List<User> findAll() {
    return userDAO.findAll();
  }

  public User findByUsername(String username) throws CustomNotFoundException {
    User obj = userDAO.findByUsername(username);
    if (obj == null) {
      throw new CustomNotFoundException(String.format("User [username=%s] not found", username));
    }
    return obj;
  }

  public User updateUser(String username, UpdateUserRequest request) {
    User user = findByUsername(username);
    if (request.getFullname() != null) {
      user.setFullname(request.getFullname());
    }
    if (request.getDob() != null) {
      user.setDob(request.getDob());
    }
    if (request.getPassword() != null) {
      user.setPassword(passwordEncoder.encode(request.getPassword()));
    }
    return save(user);
  }

  public String resetPassword(String username) {
    User user = findByUsername(username);
    String newPassword = RandomStringUtils.random(6, true, false);
    user.setPassword(passwordEncoder.encode(newPassword));
    save(user);
    return newPassword;
  }

  public void disableUser(String username) throws CustomNotFoundException {
    User user = findByUsername(username);
    user.setEnable(false);
    groupService.getPermissionBackFromUser(user);
    // todo: lấy lại quyền ở các group
    save(user);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    try {
      User user = findByUsername(username);
      if (!user.getEnable()) {
        throw new UsernameNotFoundException(
            String.format("User [username=%s] is removed", username));
      }
      return user;
    } catch (CustomNotFoundException e) {
      throw new UsernameNotFoundException(e.getMessage());
    }
  }
}
