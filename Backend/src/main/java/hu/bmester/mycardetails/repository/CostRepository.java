package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.CategoryStat;
import hu.bmester.mycardetails.model.Cost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CostRepository extends JpaRepository<Cost, Long> {
    List<Cost> findCostsByCarIdOrderByDateDesc(Long carId);
    List<Cost> findCostsByFuelingIsNotNullAndCarIdOrderByDateDesc(Long carId);
    List<Cost> findCostsByCarIdAndAndMileageIsNotNullOrderByDate(Long carId);

    @Query("select sum(c.price) from Cost c where c.car.id = :carId")
    Integer getSum(Long carId);

    @Query("select max(c.mileage) - min(c.mileage) from Cost c where c.car.id = :carId")
    Integer getTraveledDistance(Long carId);

    // nem elég a new CategoryStat a query annotációba
    @Query("select new hu.bmester.mycardetails.model.CategoryStat(c.type.name, coalesce(sum(c.price),0)) from Cost c where c.car.id = :carId group by c.type.name having sum(c.price) > 0")
    List<CategoryStat> getCategoryStat(Long carId);
}
