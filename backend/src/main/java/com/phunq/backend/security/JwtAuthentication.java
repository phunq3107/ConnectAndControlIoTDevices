package com.phunq.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.phunq.backend.entity.User;
import java.util.Date;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
public class JwtAuthentication {

  private final UserDetailsService userService;

  private final String jwtSecretKey;
  private final Long jwtExpirationTime;
  private final String ROLE_KEY = "roles";
  private final String JWT_TOKEN_STARTING_KEY = "Bearer ";
  private final Algorithm algorithm;


  public JwtAuthentication(String jwtSecretKey, Long jwtExpirationTime,
      UserDetailsService userService) {
    this.jwtSecretKey = jwtSecretKey;
    this.jwtExpirationTime = jwtExpirationTime;
    this.userService = userService;
    this.algorithm = Algorithm.HMAC256(jwtSecretKey.getBytes());
  }

  public String generateAccessToken(String subject, String issuer, List<String> roles) {
    return JWT.create()
        .withSubject(subject)
        .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationTime))
        .withIssuer(issuer)
        .withClaim(ROLE_KEY, roles)
        .sign(algorithm);
  }

  public boolean isJwtAuthorization(String authorization) {
    return authorization != null && authorization.startsWith(JWT_TOKEN_STARTING_KEY);
  }

  public String getToken(String authorization) {
    return authorization.substring(JWT_TOKEN_STARTING_KEY.length());
  }

  public Authentication verify(String authorization) throws Exception {
    String token = getToken(authorization);
    JWTVerifier verifier = JWT.require(algorithm).build();
    DecodedJWT decodedJWT = verifier.verify(token);

    String username = decodedJWT.getSubject();
    User user = (User) userService.loadUserByUsername(username);

    return new UsernamePasswordAuthenticationToken(
        user,
        null,
        user.getAuthorities()
    );
  }
}
