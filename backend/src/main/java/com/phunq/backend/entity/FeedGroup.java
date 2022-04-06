package com.phunq.backend.entity;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;

/**
 * @author phunq3107
 * @since 2/24/2022
 */
@Entity
@Data
public class FeedGroup {

    @Id
    private String id;
    private String key;
    private String name;
    private String description;
    private LocalDateTime startTime;
    private Integer noEgg;
    //    private Integer lowerTemperatureThreshold;
//    private Integer upperTemperatureThreshold;
    private LocalDateTime createdAt;
    private Boolean enableAutomation = true;

    @ManyToOne
    @JoinColumn
    private TemperatureThreshold threshold;

    @OneToMany(mappedBy = "feedGroup", fetch = FetchType.EAGER)
    private List<Feed> feeds = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    public Integer[] getCurrentThreshold() {
        if (threshold == null || startTime == null) {
            return new Integer[]{30, 40};
        }
        long dayBetween = getNumberOfActiveDay();
        if (dayBetween <= threshold.getNumberDayOfStage1()) {
            return new Integer[]{threshold.getLowerStage1(), threshold.getUpperStage1()};
        }
        if (dayBetween <= threshold.getNumberDayOfStage1() + threshold.getNumberDayOfStage2()) {
            return new Integer[]{threshold.getLowerStage2(), threshold.getUpperStage2()};
        }
        return new Integer[]{threshold.getLowerStage3(), threshold.getUpperStage3()};
    }

    public Long getNumberOfActiveDay() {
        if(startTime == null){
            return -1L;
        }
        return Duration.between(LocalDateTime.now(), startTime).toDays();
    }

    public Feed getLight() {
        return getDevice(FeedType.Light);
    }

    public Feed getScreen() {
        return getDevice(FeedType.Screen);
    }

    public Feed getSoundSensor() {
        return getDevice(FeedType.SoundSensor);
    }

    public Feed getTemperatureSensor() {
        return getDevice(FeedType.TemperatureSensor);
    }

    public Feed getDevice(FeedType feedType) {
        for (Feed feed : feeds) {
            if (feed.getType() == feedType) {
                return feed;
            }
        }
        return null;
    }


}




