package com.hackathon.flight_ontime.health.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Health", description = "System health checks")
public class HealthController {
    @GetMapping("/health")
    public String systemStatus(){
        return "OK";
    }
}
