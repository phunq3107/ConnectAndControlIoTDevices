package com.phunq.backend.controller.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UpdateUserRequest {
    String password = null;
    LocalDate dob = null;
    String fullname = null;
}
