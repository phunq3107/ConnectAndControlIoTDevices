package com.phunq.backend.security;

import com.phunq.backend.security.filter.MyAuthenticationFilter;
import com.phunq.backend.security.filter.MyAuthorizationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.http.HttpMethod.*;

/**
 * @author phunq3107
 * @since 3/7/2022
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

    @Value("${security.jwt.secretKey}")
    private String jwtSecretKey;
    @Value("${security.jwt.expirationTime}")
    private Long jwtExpirationTime;


    private final AuthenticationProvider authenticationProvider;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(
            AuthenticationProvider authenticationProvider,
            UserDetailsService userDetailsService) {
        this.authenticationProvider = authenticationProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .anyRequest().authenticated();

        http.addFilter(myAuthenticationFilter());
        http.addFilterBefore(myAuthorizationFilter(), MyAuthenticationFilter.class);

        http.cors().configurationSource(corsConfigurationSource());
        http.csrf().disable();
        http.headers().disable();

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
    }

    private MyAuthenticationFilter myAuthenticationFilter() {
        MyAuthenticationFilter filter = new MyAuthenticationFilter(
                authenticationProvider
        );
        filter.setFilterProcessesUrl("/login");
        return filter;
    }

    private MyAuthorizationFilter myAuthorizationFilter() {
        return new MyAuthorizationFilter(jwtAuthentication());
    }

    @Bean
    public JwtAuthentication jwtAuthentication() {
        return new JwtAuthentication(jwtSecretKey, jwtExpirationTime, userDetailsService);
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
        config.addAllowedMethod(PATCH);
        config.addAllowedMethod(DELETE);
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

