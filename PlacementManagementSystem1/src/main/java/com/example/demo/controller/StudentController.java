package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Student;
import com.example.demo.repository.IStudentRepository;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class StudentController {

    private final IStudentRepository studentRepository;

    public StudentController(
            IStudentRepository studentRepository) {

        this.studentRepository = studentRepository;
    }

    // GET ALL STUDENTS
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        return ResponseEntity.ok(
                studentRepository.findAll()
        );
    }

    // ADD STUDENT
    @PostMapping
    public ResponseEntity<Student> addStudent(
            @RequestBody Student student) {

        return ResponseEntity.ok(
                studentRepository.save(student)
        );
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable Long id) {

        Optional<Student> student =
                studentRepository.findById(id);

        if (student.isPresent()) {
            return ResponseEntity.ok(
                    student.get()
            );
        }

        return ResponseEntity.notFound().build();
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        Optional<Student> existing =
                studentRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        student.setId(id);

        return ResponseEntity.ok(
                studentRepository.save(student)
        );
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable Long id) {

        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        studentRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}