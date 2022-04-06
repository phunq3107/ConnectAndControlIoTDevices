package com.phunq.backend.security.filter;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.security.MyApplicationContext;

import java.io.IOException;
import java.util.TreeMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@AllArgsConstructor
public class MyAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationProvider authenticationProvider;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        if (MyApplicationContext.getAuthentication() != null) {
            return MyApplicationContext.getAuthentication();
        }
        String username = request.getParameter(getUsernameParameter());
        String password = request.getParameter(getPasswordParameter());
        if (username == null || password == null) {
            throw new BadCredentialsException("Username and password are required");
        }
        return authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username, password
                )
        );
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException, ServletException {
        MyApplicationContext.setCurrentUser(authResult);
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response, AuthenticationException failed)
            throws IOException, ServletException {
        response.setStatus(SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getOutputStream().println(
                new ObjectMapper().writeValueAsString(
                        new TreeMap<>() {{
                            put("message", failed.getMessage());
                        }}
                )

        );
    }
}
