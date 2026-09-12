package com.shaji.realestate.prediction;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PredictionExceptionHandler {

    @ExceptionHandler(PythonServiceUnavailableException.class)
    public ResponseEntity<Map<String, String>> handleUnavailable(PythonServiceUnavailableException exception) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("error", exception.getMessage()));
    }

    @ExceptionHandler(PythonServiceResponseException.class)
    public ResponseEntity<Map<String, String>> handleUpstreamError(PythonServiceResponseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", exception.getMessage()));
    }
}