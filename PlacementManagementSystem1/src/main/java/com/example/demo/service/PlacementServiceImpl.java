package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Placement;
import com.example.demo.repository.IPlacementRepository;

@Service
public class PlacementServiceImpl implements IPlacementService {

    private final IPlacementRepository placementRepository;

    public PlacementServiceImpl(IPlacementRepository placementRepository) {
        this.placementRepository = placementRepository;
    }

    @Override
    public Placement addPlacement(Placement placement) {
        return placementRepository.save(placement);
    }

    @Override
    public Placement updatePlacement(Placement placement) {

        if (placement.getId() == null ||
                !placementRepository.existsById(placement.getId())) {

            throw new IllegalArgumentException(
                    "Placement not found with ID: "
                            + placement.getId());
        }

        return placementRepository.save(placement);
    }

    @Override
    public Placement searchPlacement(long id) {

        return placementRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Placement not found with ID: " + id));
    }

    @Override
    public boolean cancelPlacement(long id) {

        if (!placementRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Placement not found with ID: " + id);
        }

        placementRepository.deleteById(id);
        return true;
    }
}