package com.example.demo.exception;

public class InvalidUserNameOrPasswordException extends RuntimeException {

    public InvalidUserNameOrPasswordException(String message) {
        super(message);
    }
}