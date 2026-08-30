package com.example.demo.service;

import com.example.demo.entity.User;

public interface IUserService {

    User addUser(User user);

    User updateUser(User user);

    User login(User user);

    boolean logOut();
}