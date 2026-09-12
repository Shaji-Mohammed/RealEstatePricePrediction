package com.shaji.realestate.prediction;

public class PythonServiceUnavailableException extends RuntimeException {

    public PythonServiceUnavailableException(Throwable cause) {
        super("The Python prediction service is unavailable", cause);
    }
}