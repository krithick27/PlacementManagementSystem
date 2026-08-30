package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Certificate;
import com.example.demo.repository.ICertificateRepository;

@RestController
@RequestMapping("/certificates")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class CertificateController {

    private final ICertificateRepository certificateRepository;

    public CertificateController(
            ICertificateRepository certificateRepository) {

        this.certificateRepository = certificateRepository;
    }

    // =====================================================
    // GET ALL CERTIFICATES
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {

        return ResponseEntity.ok(
                certificateRepository.findAll()
        );
    }

    // =====================================================
    // ADD CERTIFICATE
    // =====================================================

    @PostMapping
    public ResponseEntity<Certificate> addCertificate(
            @RequestBody Certificate certificate) {

        return ResponseEntity.ok(
                certificateRepository.save(certificate)
        );
    }

    // =====================================================
    // GET CERTIFICATE BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Certificate> getCertificateById(
            @PathVariable Long id) {

        Optional<Certificate> certificate =
                certificateRepository.findById(id);

        if (certificate.isPresent()) {
            return ResponseEntity.ok(
                    certificate.get()
            );
        }

        return ResponseEntity.notFound().build();
    }

    // =====================================================
    // UPDATE CERTIFICATE
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Certificate> updateCertificate(
            @PathVariable Long id,
            @RequestBody Certificate certificate) {

        Optional<Certificate> existing =
                certificateRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        certificate.setId(id);

        return ResponseEntity.ok(
                certificateRepository.save(certificate)
        );
    }

    // =====================================================
    // DELETE CERTIFICATE
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(
            @PathVariable Long id) {

        if (!certificateRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        certificateRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}