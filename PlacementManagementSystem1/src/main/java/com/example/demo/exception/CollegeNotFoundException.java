package com.example.demo.exception;

public class CollegeNotFoundException extends RuntimeException {

    public CollegeNotFoundException(String message) {
        super(message);
    }
}