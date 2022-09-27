package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Cost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CostRepository extends JpaRepository<Cost, Long> {
    List<Cost> findCostsByCarId(Long carId);
}