package com.example.demo.service;

import com.example.demo.entity.Certificate;
import com.example.demo.entity.Student;

public interface IStudentService {

    Student addStudent(Student student);

    Student updateStudent(Student student);

    Student searchStudentById(long id);

    Student searchStudentByHallTicket(Long hallTicketNo);

    Certificate addCertificate(Certificate certificate);

    Certificate updateCertificate(Certificate certificate);

    boolean deleteStudent(long id);
}