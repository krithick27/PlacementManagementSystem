package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.College;
import com.example.demo.entity.Placement;
import com.example.demo.repository.ICollegeRepository;

@RestController
@RequestMapping("/colleges")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class CollegeController {

    private final ICollegeRepository collegeRepository;

    public CollegeController(ICollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    // =====================================================
    // GET ALL COLLEGES
    // =====================================================

    @GetMapping
    public ResponseEntity<List<College>> getAllColleges() {

        return ResponseEntity.ok(
                collegeRepository.findAll()
        );
    }

    // =====================================================
    // ADD COLLEGE
    // =====================================================

    @PostMapping
    public ResponseEntity<College> addCollege(
            @RequestBody College college) {

        return ResponseEntity.ok(
                collegeRepository.save(college)
        );
    }

    // =====================================================
    // GET COLLEGE BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<College> getCollegeById(
            @PathVariable Long id) {

        Optional<College> college =
                collegeRepository.findById(id);

        if (college.isPresent()) {
            return ResponseEntity.ok(
                    college.get()
            );
        }

        return ResponseEntity.notFound().build();
    }

    // =====================================================
    // UPDATE COLLEGE
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<College> updateCollege(
            @PathVariable Long id,
            @RequestBody College college) {

        Optional<College> existing =
                collegeRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        college.setId(id);

        return ResponseEntity.ok(
                collegeRepository.save(college)
        );
    }

    // =====================================================
    // DELETE COLLEGE
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollege(
            @PathVariable Long id) {

        if (!collegeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        collegeRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    // =====================================================
    // SCHEDULE PLACEMENT
    // =====================================================

    @PostMapping("/schedule-placement")
    public ResponseEntity<Boolean> schedulePlacement(
            @RequestBody Placement placement) {

        return ResponseEntity.ok(true);
    }
}