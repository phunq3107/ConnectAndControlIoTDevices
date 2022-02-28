package com.phunq.backend.resources;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_NOT_FOUND;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.exception.CustomBadRequestException;
import com.phunq.backend.exception.CustomNotFoundException;
import java.io.IOException;
import java.util.TreeMap;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author phunq3107
 * @since 2/25/2022
 */
@RestControllerAdvice
@AllArgsConstructor
public class HandleException {

  private final ObjectMapper mapper;

  @ExceptionHandler({CustomNotFoundException.class})
  public void handleNotFoundException(HttpServletResponse response, Exception e)
      throws IOException {
    response.setStatus(SC_NOT_FOUND);
    response.setContentType("application/json");
    response.getOutputStream().println(
        mapper.writeValueAsString(
            new TreeMap<>(){{
              put("message", e.getMessage());
            }}
        )
    );
  }

  @ExceptionHandler({CustomBadRequestException.class})
  public void handleBadRequestException(HttpServletResponse response, Exception e)
      throws IOException {
    response.setStatus(SC_BAD_REQUEST);
    response.setContentType("application/json");
    response.getOutputStream().println(
        mapper.writeValueAsString(
            new TreeMap<>(){{
              put("message", e.getMessage());
            }}
        )
    );
  }
}
