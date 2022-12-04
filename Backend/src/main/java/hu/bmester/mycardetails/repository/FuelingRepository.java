package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.model.Fueling;
import hu.bmester.mycardetails.model.FuelingCostResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;


public interface FuelingRepository extends JpaRepository<Fueling, Long> {
    @Query("select sum(f.quantity) from Fueling f where f.cost.car.id = :carId")
    Double getSum(Long carId);

    @Query("select sum(f.quantity) from Fueling f where f.cost.car.id = :carId and extract(year from f.cost.date) = :year")
    Double getSumByYear(Long carId,Integer year);
    Fueling findFirstByCost_CarOrderByCost_Date(Car car);
    Fueling findFirstByCost_CarOrderByCost_DateDesc(Car car);

    @Query(value = "select c.mileage, f.quantity, f.isfull" +
            " from fuelings f" +
            " left join costs c on f.cost = c.id" +
            " where c.car = :carId" +
            " and c.date <= :date and c.mileage <= :mileage" +
            " order by c.date desc, c.mileage desc" +
            " limit 3", nativeQuery = true)
    List<FuelingCostResponse> findLastThreeFuelingsByFuelingData(Long carId, Timestamp date, Integer mileage);

    Fueling findFuelingById(Long id);
}
