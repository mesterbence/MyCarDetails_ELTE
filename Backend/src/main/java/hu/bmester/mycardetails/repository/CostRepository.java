package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Cost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CostRepository extends JpaRepository<Cost, Long> {
}
