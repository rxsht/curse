package com.guidemate.infrastructure.integration.google;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class GoogleMapsClient {
    private final RestClient restClient = RestClient.create();
    @Value("${google.maps.api-key:}")
    private String apiKey;

    public Map<?, ?> geocode(String address) {
        if (apiKey == null || apiKey.isBlank()) {
            return Map.of("status", "NO_API_KEY");
        }
        return restClient.get()
                .uri("https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={key}", address, apiKey)
                .retrieve()
                .body(Map.class);
    }
}
