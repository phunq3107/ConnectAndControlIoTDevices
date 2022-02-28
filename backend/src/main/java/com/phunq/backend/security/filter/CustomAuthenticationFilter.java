package com.phunq.backend.security.filter;

import static javax.servlet.http.HttpServletResponse.SC_OK;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.security.jwt.JwtAuthentication;
import java.io.IOException;
import java.util.TreeMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author phunq3107
 * @since 2/27/2022
 */
@AllArgsConstructor
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final JwtAuthentication jwtAuthentication;

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
      HttpServletResponse response) throws AuthenticationException {
    String username = request.getParameter(getUsernameParameter());
    String password = request.getParameter(getPasswordParameter());
    UsernamePasswordAuthenticationToken token
        = new UsernamePasswordAuthenticationToken(username, password);
    try {
      return authenticationManager.authenticate(token);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }

  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain, Authentication authResult) throws IOException, ServletException {

    String username = ((User) authResult.getPrincipal()).getUsername();
    String token = jwtAuthentication.generateAccessToken(
        username,
        request.getRequestURL().toString(),
        authResult.getAuthorities().toArray()[0].toString()
    );

    response.setStatus(SC_OK);
    response.setContentType("application/json");
    response.getOutputStream().println(
        new ObjectMapper().writeValueAsString(
            new TreeMap<String, String>() {{
              put("access_token", token);
            }}
        )
    );
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {
    super.unsuccessfulAuthentication(request, response, failed);
  }
}
