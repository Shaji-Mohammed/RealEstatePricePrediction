package com.shaji.realestate.prediction;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.LinkedHashMap;
import java.util.Map;

public class PredictionRequest {

    private final Map<String, Double> features = new LinkedHashMap<>();

    @JsonAnySetter
    public void addFeature(String name, Double value) {
        features.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Double> getFeatures() {
        return features;
    }
}