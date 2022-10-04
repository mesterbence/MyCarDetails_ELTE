package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CostType;
import hu.bmester.mycardetails.model.FuelType;
import hu.bmester.mycardetails.repository.CostTypeRepository;
import hu.bmester.mycardetails.repository.FuelTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class FuelTypeServiceImpl implements FuelTypeService {

    @Autowired
    private FuelTypeRepository fuelTypeRepository;

    @Override
    public FuelType findFuelTypeById(int typeId) {
        return fuelTypeRepository.findFuelTypeById(typeId);
    }

    @Override
    public List<FuelType> findAllFuelType() {
        return this.fuelTypeRepository.findAll();
    }
}
