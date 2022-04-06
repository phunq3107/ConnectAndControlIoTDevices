package com.phunq.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phunq.backend.exception.CustomBadRequestException;
import com.phunq.backend.exception.CustomForbiddenException;
import com.phunq.backend.exception.CustomNotFoundException;
import com.phunq.backend.exception.UsernameAlreadyExistException;

import java.io.IOException;
import java.util.TreeMap;
import javax.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public void handleNotFoundException(HttpServletResponse response, Exception e)
            throws IOException {
        printMessage(response, e);
    }

    @ExceptionHandler({CustomBadRequestException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public void handleBadRequestException(HttpServletResponse response, Exception e)
            throws IOException {
        printMessage(response, e);
    }

    @ExceptionHandler({UsernameAlreadyExistException.class})
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public void handleUsernameAlreadyExistException(HttpServletResponse response, Exception e)
            throws IOException {
        printMessage(response, e);
    }

    @ExceptionHandler({CustomForbiddenException.class})
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public void handleCustomForbiddenException(HttpServletResponse response, Exception e)
            throws IOException {
        printMessage(response, e);
    }

    private void printMessage(HttpServletResponse response, Exception e) throws IOException {
        response.setContentType("application/json");
        response.getOutputStream().println(
                mapper.writeValueAsString(
                        new TreeMap<>() {{
                            put("message", e.getMessage());
                        }}
                )
        );
    }
}
