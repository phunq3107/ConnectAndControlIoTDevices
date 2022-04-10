package com.phunq.backend.security;

import com.phunq.backend.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@Component
@AllArgsConstructor
public class MyAuthenticationProvider implements AuthenticationProvider {

  private final UserDetailsService userService;
  private final PasswordEncoder passwordEncoder;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    UsernamePasswordAuthenticationToken token =
        (UsernamePasswordAuthenticationToken) authentication;
    String username = (String) token.getPrincipal();
    String password = (String) token.getCredentials();
    User user = (User) userService.loadUserByUsername(username);
    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new BadCredentialsException(
          String.format("Wrong password for username [%s]", username));
    }
    return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
