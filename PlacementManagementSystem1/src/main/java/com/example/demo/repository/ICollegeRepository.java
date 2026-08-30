package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.College;

public interface ICollegeRepository extends JpaRepository<College, Long> {

}