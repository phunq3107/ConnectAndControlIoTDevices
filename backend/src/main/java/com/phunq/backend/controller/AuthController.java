package com.phunq.backend.controller;

import static org.springframework.http.HttpStatus.OK;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.entity.User;
import com.phunq.backend.security.JwtAuthentication;
import com.phunq.backend.security.MyApplicationContext;

import java.io.IOException;
import java.util.TreeMap;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@RestController
@RequestMapping("")
@AllArgsConstructor
@Slf4j
public class AuthController {

  private final ObjectMapper mapper;
  private final JwtAuthentication jwtAuthentication;

  @GetMapping(value = "/login", produces = "application/json")
  @ResponseStatus(OK)
  public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
    User user = MyApplicationContext.getCurrentUser();
    String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String accessToken =
        jwtAuthentication.isJwtAuthorization(authorizationHeader)
            ? jwtAuthentication.getToken(authorizationHeader)
            : jwtAuthentication.generateAccessToken(
                user.getUsername(),
                "/login",
                user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));
    response.setContentType("application/json");
    response
        .getOutputStream()
        .println(
            mapper.writeValueAsString(
                new TreeMap<>() {
                  {
                    put("username", user.getUsername());
                    put("role", user.getRole());
                    put("access_token", accessToken);
                  }
                }));
  }
}
