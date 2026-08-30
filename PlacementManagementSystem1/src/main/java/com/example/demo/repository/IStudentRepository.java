package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Student;

public interface IStudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByHallTicketNo(Long hallTicketNo);

}