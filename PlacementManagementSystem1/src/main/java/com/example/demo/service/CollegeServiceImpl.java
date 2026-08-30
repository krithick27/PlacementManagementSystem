package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.College;
import com.example.demo.entity.Placement;
import com.example.demo.exception.CollegeNotFoundException;
import com.example.demo.repository.ICollegeRepository;
import com.example.demo.repository.IPlacementRepository;

@Service
public class CollegeServiceImpl implements ICollegeService {

    private final ICollegeRepository collegeRepository;
    private final IPlacementRepository placementRepository;

    public CollegeServiceImpl(ICollegeRepository collegeRepository,
                              IPlacementRepository placementRepository) {
        this.collegeRepository = collegeRepository;
        this.placementRepository = placementRepository;
    }

    @Override
    public College addCollege(College college) {
        return collegeRepository.save(college);
    }

    @Override
    public College updateCollege(College college) {

        if (college.getId() == null ||
                !collegeRepository.existsById(college.getId())) {

            throw new CollegeNotFoundException(
                    "College not found with ID: " + college.getId());
        }

        return collegeRepository.save(college);
    }

    @Override
    public College searchCollege(College college) {

        if (college.getId() == null) {
            throw new CollegeNotFoundException(
                    "College ID is required");
        }

        return collegeRepository.findById(college.getId())
                .orElseThrow(() ->
                        new CollegeNotFoundException(
                                "College not found with ID: "
                                        + college.getId()));
    }

    @Override
    public boolean deleteCollege(long id) {

        if (!collegeRepository.existsById(id)) {
            throw new CollegeNotFoundException(
                    "College not found with ID: " + id);
        }

        collegeRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean schedulePlacement(Placement placement) {
        placementRepository.save(placement);
        return true;
    }
}