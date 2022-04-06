package com.phunq.backend.bootstrap;

import com.phunq.backend.entity.TemperatureThreshold;
import com.phunq.backend.service.entity.ThresholdService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("dev")
@Component
@AllArgsConstructor
public class BootstrapData implements CommandLineRunner {
    private final ThresholdService thresholdService;
    @Override
    public void run(String... args) throws Exception {
        TemperatureThreshold t1 = TemperatureThreshold.builder()
                .name("Trứng gà loại 1")
                .numberDayOfStage1(5)
                .lowerStage1(27)
                .upperStage1(37)
                .numberDayOfStage2(4)
                .lowerStage2(30)
                .upperStage2(40)
                .lowerStage3(26)
                .upperStage3(36)
                .build();
        TemperatureThreshold t2 = TemperatureThreshold.builder()
                .name("Trứng gà loại 2")
                .numberDayOfStage1(4)
                .lowerStage1(26)
                .upperStage1(39)
                .numberDayOfStage2(5)
                .lowerStage2(30)
                .upperStage2(40)
                .lowerStage3(40)
                .upperStage3(40)
                .build();
        TemperatureThreshold t3 = TemperatureThreshold.builder()
                .name("Trứng vịt loại 1")
                .numberDayOfStage1(2)
                .lowerStage1(29)
                .upperStage1(39)
                .numberDayOfStage2(4)
                .lowerStage2(30)
                .upperStage2(40)
                .lowerStage3(26)
                .upperStage3(36)
                .build();
        TemperatureThreshold t4 = TemperatureThreshold.builder()
                .name("Trứng vịt loại 2")
                .numberDayOfStage1(10)
                .lowerStage1(32)
                .upperStage1(37)
                .numberDayOfStage2(4)
                .lowerStage2(30)
                .upperStage2(40)
                .lowerStage3(26)
                .upperStage3(36)
                .build();


        thresholdService.save(t1);
        thresholdService.save(t2);
        thresholdService.save(t3);
        thresholdService.save(t4);

    }
}
