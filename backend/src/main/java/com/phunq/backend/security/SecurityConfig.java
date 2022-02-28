package com.phunq.backend.security;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

import com.auth0.jwt.algorithms.Algorithm;
import com.phunq.backend.security.filter.CustomAuthenticationFilter;
import com.phunq.backend.security.filter.CustomAuthorizationFilter;
import com.phunq.backend.security.jwt.JwtAuthentication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * @author phunq3107
 * @since 2/27/2022
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private static final String[] AUTH_WHITELIST = {
      "/swagger-resources/**",
      "/swagger-ui/**",
      "/v2/api-docs",
      "/webjars/**",
      "/h2-console/**",
      "/login/**", "/logout/**", "/authentication/**"
  };

  private static final String[] AUTH_ADMIN = {
      "/api/v1/**"
  };

  @Value("${admin.username}")
  private String username;
  @Value("${admin.password}")
  private String password;
  @Value("${security.jwt.secretKey}")
  private String jwtSecretKey;
  @Value("${security.jwt.expirationTime}")
  private Long jwtExpirationTime;


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http.authorizeRequests()
        .antMatchers(AUTH_WHITELIST).permitAll()
        .antMatchers(AUTH_ADMIN).hasRole("ADMIN");

    http.addFilter(customAuthenticationFilter());
    http.addFilterBefore(customAuthorizationFilter(), CustomAuthenticationFilter.class);

    http.cors().configurationSource(corsConfigurationSource());
    http.csrf().disable();
    http.headers().disable();

  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .inMemoryAuthentication()
        .withUser(username).password(passwordEncoder().encode(password)).roles("ADMIN")
        .and().passwordEncoder(passwordEncoder())
    ;
  }

  public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
    CustomAuthenticationFilter filter = new CustomAuthenticationFilter(
        authenticationManager(), jwtAuthentication()
    );
    filter.setFilterProcessesUrl("/login");
    return filter;
  }

  public CustomAuthorizationFilter customAuthorizationFilter() {
    return new CustomAuthorizationFilter(
        jwtAuthentication()
    );
  }

  @Bean
  public JwtAuthentication jwtAuthentication() {
    Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey.getBytes());
    return new JwtAuthentication(algorithm, jwtExpirationTime);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.addAllowedOriginPattern("*");
    config.setAllowCredentials(true);
    config.addAllowedHeader("X-Requested-With");
    config.addAllowedHeader("Content-Type");
    config.addAllowedHeader("Authorization");
    config.addAllowedMethod(POST);
    config.addAllowedMethod(GET);
    source.registerCorsConfiguration("/**", config);
    return source;
  }

}
