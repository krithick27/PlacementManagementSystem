package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.exception.InvalidUserNameOrPasswordException;
import com.example.demo.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    public UserServiceImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {

        if (user.getId() == null ||
                !userRepository.existsById(user.getId())) {

            throw new IllegalArgumentException(
                    "User not found with ID: " + user.getId());
        }

        return userRepository.save(user);
    }

    @Override
    public User login(User user) {

        User existingUser = userRepository.findByName(user.getName());

        if (existingUser == null ||
                !existingUser.getPassword().equals(user.getPassword())) {

            throw new InvalidUserNameOrPasswordException(
                    "Invalid username or password");
        }

        return existingUser;
    }

    @Override
    public boolean logOut() {
        return true;
    }
}