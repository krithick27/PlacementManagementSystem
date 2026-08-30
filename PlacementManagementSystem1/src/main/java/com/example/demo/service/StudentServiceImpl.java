package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Certificate;
import com.example.demo.entity.Student;
import com.example.demo.exception.InvalidHallTicketException;
import com.example.demo.exception.StudentNotFoundException;
import com.example.demo.repository.ICertificateRepository;
import com.example.demo.repository.IStudentRepository;

@Service
public class StudentServiceImpl implements IStudentService {

    private final IStudentRepository studentRepository;
    private final ICertificateRepository certificateRepository;

    public StudentServiceImpl(IStudentRepository studentRepository,
                              ICertificateRepository certificateRepository) {
        this.studentRepository = studentRepository;
        this.certificateRepository = certificateRepository;
    }

    @Override
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Student student) {

        if (student.getId() == null ||
                !studentRepository.existsById(student.getId())) {

            throw new StudentNotFoundException(
                    "Student not found with ID: " + student.getId());
        }

        return studentRepository.save(student);
    }

    @Override
    public Student searchStudentById(long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student not found with ID: " + id));
    }

    @Override
    public Student searchStudentByHallTicket(Long hallTicketNo) {

        return studentRepository.findByHallTicketNo(hallTicketNo)
                .orElseThrow(() ->
                        new InvalidHallTicketException(
                                "Invalid hall ticket number: "
                                        + hallTicketNo));
    }

    @Override
    public Certificate addCertificate(Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @Override
    public Certificate updateCertificate(Certificate certificate) {

        if (certificate.getId() == null ||
                !certificateRepository.existsById(certificate.getId())) {

            throw new IllegalArgumentException(
                    "Certificate not found with ID: "
                            + certificate.getId());
        }

        return certificateRepository.save(certificate);
    }

    @Override
    public boolean deleteStudent(long id) {

        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException(
                    "Student not found with ID: " + id);
        }

        studentRepository.deleteById(id);
        return true;
    }
}