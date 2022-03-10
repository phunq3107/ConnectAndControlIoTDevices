package com.phunq.backend.controller.dto;

import lombok.Data;

/**
 * @author phunq3107
 * @since 3/4/2022
 */
@Data
public class SetGroupThresholdRequest {
  Integer lower;
  Integer upper;
}
