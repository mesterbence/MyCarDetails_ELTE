package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.Fueling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface FuelingRepository extends JpaRepository<Fueling, Long> {
    @Query("select sum(f.quantity) from Fueling f where f.cost.car.id = :carId")
    Double getSum(Long carId);

    @Query("select sum(f.quantity) from Fueling f where f.cost.car.id = :carId and extract(year from f.cost.date) = :year")
    Double getSumByYear(Long carId,Integer year);
    Fueling findFirstByCost_CarOrderByCost_Date(Car car);
    Fueling findFirstByCost_CarOrderByCost_DateDesc(Car car);
}
