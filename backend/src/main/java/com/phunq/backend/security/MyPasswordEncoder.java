package com.phunq.backend.security;

import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@Component
public class MyPasswordEncoder implements PasswordEncoder {

  private final HashFunction hashFunction = Hashing.sha256();
  private final int SALT_SIZE = 10;
  private final Random random = new Random();

  @Override
  public String encode(CharSequence rawPassword) {
    String salt = getRandomSalt();
    return hashingWithSalt((String) rawPassword, salt);
  }

  @Override
  public boolean matches(CharSequence rawPassword, String encodedPassword) {
    String salt = encodedPassword.substring(0, SALT_SIZE);
    String encodeRawPassword = hashingWithSalt((String) rawPassword, salt);
    return encodeRawPassword.equals(encodedPassword);
  }

  private String hashingWithSalt(String rawPassword, String salt) {
    String prepareString = salt + rawPassword;
    return salt + hashFunction.hashBytes(prepareString.getBytes(StandardCharsets.UTF_8)).toString();
  }

  private String getRandomSalt() {
    return RandomStringUtils.random(SALT_SIZE, true, false);
  }
}
