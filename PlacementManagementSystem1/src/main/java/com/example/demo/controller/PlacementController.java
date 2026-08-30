package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Placement;
import com.example.demo.repository.IPlacementRepository;

@RestController
@RequestMapping("/placements")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class PlacementController {

    private final IPlacementRepository placementRepository;

    public PlacementController(
            IPlacementRepository placementRepository) {

        this.placementRepository = placementRepository;
    }

    // =====================================================
    // GET ALL PLACEMENTS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Placement>> getAllPlacements() {

        return ResponseEntity.ok(
                placementRepository.findAll()
        );
    }

    // =====================================================
    // ADD PLACEMENT
    // =====================================================

    @PostMapping
    public ResponseEntity<Placement> addPlacement(
            @RequestBody Placement placement) {

        return ResponseEntity.ok(
                placementRepository.save(placement)
        );
    }

    // =====================================================
    // GET PLACEMENT BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Placement> getPlacementById(
            @PathVariable Long id) {

        Optional<Placement> placement =
                placementRepository.findById(id);

        if (placement.isPresent()) {
            return ResponseEntity.ok(
                    placement.get()
            );
        }

        return ResponseEntity.notFound().build();
    }

    // =====================================================
    // UPDATE PLACEMENT
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Placement> updatePlacement(
            @PathVariable Long id,
            @RequestBody Placement placement) {

        Optional<Placement> existing =
                placementRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        placement.setId(id);

        return ResponseEntity.ok(
                placementRepository.save(placement)
        );
    }

    // =====================================================
    // DELETE PLACEMENT
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlacement(
            @PathVariable Long id) {

        if (!placementRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        placementRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}