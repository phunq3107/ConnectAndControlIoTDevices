package com.phunq.backend.adafruit.dto;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * @author phunq3107
 * @since 2/23/2022
 */
@Data
public class FeedValueDto {
    private String id;
    private String value;
    private String feed_id;
    private String feed_key;
    private LocalDateTime created_at;
    private String created_epoch;
    private LocalDateTime expiration;

}
