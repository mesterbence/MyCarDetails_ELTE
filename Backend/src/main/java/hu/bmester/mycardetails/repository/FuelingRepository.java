package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Fueling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface FuelingRepository extends JpaRepository<Fueling, Long> {
    @Query("select sum(f.quantity) from Fueling f where f.cost.car.id = :carId")
    Double getSum(Long carId);
}
