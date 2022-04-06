package com.phunq.backend.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.security.JwtAuthentication;
import com.phunq.backend.security.MyApplicationContext;

import java.io.IOException;
import java.util.TreeMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@AllArgsConstructor
public class MyAuthorizationFilter extends OncePerRequestFilter {

    private final JwtAuthentication jwtAuthentication;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (jwtAuthentication.isJwtAuthorization(authorizationHeader)) {
            try {
                Authentication authentication = jwtAuthentication.verify(authorizationHeader);
                MyApplicationContext.setCurrentUser(authentication);
            } catch (Exception e) {
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getOutputStream().println(
                        new ObjectMapper().writeValueAsString(
                                new TreeMap<>() {{
                                    put("error_message", e.getMessage());
                                }}
                        )
                );
                return;
            }
        }
        filterChain.doFilter(request, response);


    }
}
