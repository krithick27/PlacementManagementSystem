package com.example.demo.service;

import com.example.demo.entity.College;
import com.example.demo.entity.Placement;

public interface ICollegeService {

    College addCollege(College college);

    College updateCollege(College college);

    College searchCollege(College college);

    boolean deleteCollege(long id);

    boolean schedulePlacement(Placement placement);
}