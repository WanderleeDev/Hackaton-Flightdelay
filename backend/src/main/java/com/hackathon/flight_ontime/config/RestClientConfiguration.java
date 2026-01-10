package com.hackathon.flight_ontime.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfiguration {

    @Value("${fastapi.base-url}")
    private String fastApiBaseUrl;

    @Bean
    public RestClient getRestClient(){
        return RestClient.builder()
                .baseUrl(fastApiBaseUrl)
                .build();
    }
}
