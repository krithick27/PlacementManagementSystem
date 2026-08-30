package com.example.demo.exception;

public class InvalidHallTicketException extends RuntimeException {

    public InvalidHallTicketException(String message) {
        super(message);
    }
}