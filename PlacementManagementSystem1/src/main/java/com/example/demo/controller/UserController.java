package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.IUserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://localhost:5174"
	})
public class UserController {

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> addUser(
            @RequestBody User user) {
        return ResponseEntity.ok(
                userService.addUser(user));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(
            @RequestBody User user) {
        return ResponseEntity.ok(
                userService.updateUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestBody User user) {
        return ResponseEntity.ok(
                userService.login(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout() {
        return ResponseEntity.ok(
                userService.logOut());
    }
}