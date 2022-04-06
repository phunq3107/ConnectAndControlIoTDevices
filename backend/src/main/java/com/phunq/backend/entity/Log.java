package com.phunq.backend.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Log {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ActionType action;

    @CreationTimestamp
    private LocalDateTime timestamp;

    private String description;

    @Column(nullable = false)
    private String username;

}
