package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.FuelType;

import java.util.List;

public interface FuelTypeService {
    FuelType findFuelTypeById(int id);
    List<FuelType> findAllFuelType();
}
