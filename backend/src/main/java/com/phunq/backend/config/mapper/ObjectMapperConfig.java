package com.phunq.backend.config.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.text.SimpleDateFormat;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Configuration
public class ObjectMapperConfig {

  @Bean
  public JavaTimeModule dataTimeModule() {
    return new JavaTimeModule();
  }

  @Bean
  public ObjectMapper getObjectMapper(JavaTimeModule javaTimeModule) {
    ObjectMapper mapper = new ObjectMapper();
    mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ"));
    mapper.registerModule(javaTimeModule);
    return mapper;
  }
}
