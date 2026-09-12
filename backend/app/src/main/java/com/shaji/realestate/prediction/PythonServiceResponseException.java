package com.shaji.realestate.prediction;

public class PythonServiceResponseException extends RuntimeException {

    private final int statusCode;

    public PythonServiceResponseException(int statusCode) {
        super("The Python prediction service returned HTTP " + statusCode);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}