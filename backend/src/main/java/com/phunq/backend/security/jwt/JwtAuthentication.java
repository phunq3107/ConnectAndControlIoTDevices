package com.phunq.backend.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * @author phunq3107
 * @since 2/27/2022
 */
@AllArgsConstructor
public class JwtAuthentication {

  private final Algorithm algorithm;
  private final Long expirationTime;
  private static final String ROLE_KEY = "role";
  private static final String JWT_TOKEN_STARTING_KEY = "Bearer ";

  public  enum JwtResponseErrorCode{
    EXPIRED_TOKEN

  }

  public String generateAccessToken(String subject, String issuer, String role) {
    return JWT.create()
        .withSubject(subject)
        .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
        .withIssuer(issuer)
        .withClaim(ROLE_KEY, role)
        .sign(algorithm);
  }

  public Authentication verify(String authorization) throws Exception {
    String token = getToken(authorization);
    JWTVerifier verifier = JWT.require(algorithm).build();
    DecodedJWT decodedJWT = verifier.verify(token);

    String username = decodedJWT.getSubject();
    String role = decodedJWT.getClaim(ROLE_KEY).toString();
    List<GrantedAuthority> authorities = new ArrayList<>();
    if(role!=null){
      authorities.add(new SimpleGrantedAuthority(role.substring(1, role.length()-1)));
    }

    UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(
        username,
        null,
        authorities
    );
    return new UsernamePasswordAuthenticationToken(user, null, authorities);

  }

  public boolean isJwtAuthorization(String authorization) {
    return authorization != null && authorization.startsWith(JWT_TOKEN_STARTING_KEY);
  }

  public String getToken(String authorization) {
    return authorization.substring(JWT_TOKEN_STARTING_KEY.length());
  }


}
