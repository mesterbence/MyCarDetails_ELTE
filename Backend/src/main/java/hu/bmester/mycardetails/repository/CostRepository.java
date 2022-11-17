package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.CarStatistic;
import hu.bmester.mycardetails.model.CategoryStat;
import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.model.FuelingStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CostRepository extends JpaRepository<Cost, Long> {
    List<Cost> findCostsByCarIdOrderByDateDesc(Long carId);
    List<Cost> findCostsByFuelingIsNotNullAndCarIdOrderByDateDesc(Long carId);
    List<Cost> findCostsByCarIdAndAndMileageIsNotNullOrderByDate(Long carId);

    @Query("select sum(c.price) from Cost c where c.car.id = :carId")
    Integer getSum(Long carId);

    @Query(value = "select sum(c.price) from Costs c where c.car = :carId and extract(year from c.date) = :year",nativeQuery = true)
    Integer getSumByYear(Long carId,Integer year);

    @Query("select max(c.mileage) - min(c.mileage) from Cost c where c.car.id = :carId")
    Integer getTraveledDistance(Long carId);

    @Query(value = "select max(c.mileage) - min(c.mileage) from Costs c where c.car = :carId and extract(year from c.date) = :year", nativeQuery = true)
    Integer getTraveledDistanceByYear(Long carId, Integer year);

    // nem elég a new CategoryStat a query annotációba
    @Query("select new hu.bmester.mycardetails.model.CategoryStat(c.type.name, coalesce(sum(c.price),0)) from Cost c where c.car.id = :carId group by c.type.name having sum(c.price) > 0")
    List<CategoryStat> getCategoryStat(Long carId);

    @Query("select distinct extract(year from c.date) from Cost c where c.date is not null and c.car.id=:carId order by extract(year from c.date) desc")
    List<Integer> findDistinctYearsByCarId(Long carId);

    @Query(value = "select c.* from Costs c INNER JOIN Fuelings f on f.cost = c.id where c.car = :carId AND extract(year from c.date) = :year order by c.date desc",nativeQuery = true)
    List<Cost> findFuelingsByYear(Long carId, Integer year);

}
