package com.phunq.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemperatureThreshold {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private Integer numberDayOfStage1;
    private Integer lowerStage1;
    private Integer upperStage1;
    private Integer numberDayOfStage2;
    private Integer lowerStage2;
    private Integer upperStage2;
    private Integer lowerStage3;
    private Integer upperStage3;

}
