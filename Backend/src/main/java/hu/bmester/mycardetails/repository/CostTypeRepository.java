package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.CostType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CostTypeRepository extends JpaRepository<CostType, Integer> {
    CostType findCostTypeById(int typeId);
}
