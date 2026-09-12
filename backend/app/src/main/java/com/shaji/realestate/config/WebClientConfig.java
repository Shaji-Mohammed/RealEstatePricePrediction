package com.shaji.realestate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    WebClient predictionWebClient(WebClient.Builder builder) {
        return builder.baseUrl("http://localhost:8000").build();
    }
}