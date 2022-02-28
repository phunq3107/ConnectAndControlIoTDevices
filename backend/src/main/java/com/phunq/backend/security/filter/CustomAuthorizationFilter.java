package com.phunq.backend.security.filter;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.security.jwt.JwtAuthentication;
import com.phunq.backend.security.jwt.JwtAuthentication.JwtResponseErrorCode;
import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * @author phunq3107
 * @since 2/27/2022
 */
@AllArgsConstructor
@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {

  private final JwtAuthentication jwtAuthentication;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (jwtAuthentication.isJwtAuthorization(authorizationHeader)) {
      try {

        Authentication authentication = jwtAuthentication.verify(authorizationHeader);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      } catch (Exception e) {

        log.error(e.getMessage());
        String errorCode = "ERROR";
        if (e instanceof TokenExpiredException) {
          errorCode = JwtResponseErrorCode.EXPIRED_TOKEN.toString();

        }

        Map<String, String> responseBody = new TreeMap<>();
        responseBody.put("error_message", e.getMessage());
        responseBody.put("error_code", errorCode);

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getOutputStream().println(
            new ObjectMapper().writeValueAsString(
                responseBody
            )
        );
        return;
      }
    }

    filterChain.doFilter(request, response);

  }
}
