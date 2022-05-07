package com.phunq.backend.bootstrap;

import com.phunq.backend.entity.User;
import com.phunq.backend.entity.UserRole;
import com.phunq.backend.service.entity.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@Configuration
public class StartupConfig implements CommandLineRunner {

  @Value("${admin.username}")
  private String username;

  @Value("${admin.password}")
  private String password;

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  public StartupConfig(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(String... args) throws Exception {
    try{
      User admin = new User();
      admin.setUsername(username);
      admin.setPassword(passwordEncoder.encode(password));
      admin.setRole(UserRole.ADMIN);
      userService.save(admin);
    } catch (Exception ignore){}
  }
}
