package com.example.demo.service;

import com.example.demo.entity.Placement;

public interface IPlacementService {

    Placement addPlacement(Placement placement);

    Placement updatePlacement(Placement placement);

    Placement searchPlacement(long id);

    boolean cancelPlacement(long id);
}