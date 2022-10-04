package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.FuelType;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FuelTypeRepository extends JpaRepository<FuelType, Integer> {
    FuelType findFuelTypeById(int id);
}
