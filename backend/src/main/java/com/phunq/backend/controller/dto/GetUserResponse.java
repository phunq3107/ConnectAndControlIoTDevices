package com.phunq.backend.controller.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

/**
 * @author phunq3107
 * @since 3/7/2022
 */
@Data
@Builder
public class GetUserResponse {

    private String username;
    private String fullname;
    private LocalDate dob;
    private Boolean enable = true;
    private List<String> groups = new ArrayList<>();

}
