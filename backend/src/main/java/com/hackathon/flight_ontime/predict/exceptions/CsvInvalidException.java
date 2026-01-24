package com.hackathon.flight_ontime.predict.exceptions;

public class CsvInvalidException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Invalid CSV file: empty, wrong content type, or malformed.";

    public CsvInvalidException() {
        super(DEFAULT_MESSAGE);
    }

    public CsvInvalidException(String message) {
        super(message != null && !message.isBlank() ? message : DEFAULT_MESSAGE);
    }
}
