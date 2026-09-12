package com.shaji.realestate.prediction;

import java.time.Duration;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PredictionService {

    private final WebClient predictionWebClient;

    public PredictionService(WebClient predictionWebClient) {
        this.predictionWebClient = predictionWebClient;
    }

    public PredictionResponse predict(PredictionRequest request) {
        try {
            return predictionWebClient.post()
                    .uri("/predict")
                    .bodyValue(request)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError,
                            response -> Mono.error(new PythonServiceResponseException(response.statusCode().value())))
                    .bodyToMono(PredictionResponse.class)
                    .timeout(Duration.ofSeconds(5))
                    .block();
        } catch (PythonServiceResponseException exception) {
            throw exception;
        } catch (RuntimeException exception) {
            throw new PythonServiceUnavailableException(exception);
        }
    }
}