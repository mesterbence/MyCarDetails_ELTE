package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CategoryStat;
import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.model.FuelingStat;

import java.util.List;
import java.util.Map;

public interface CostService {
    List<Cost> findAllCosts();
    List<Cost> findAllCostsWithMileage(Long carId);
    List<Cost> findByCarId(Long carId);
    Cost saveCost(Cost cost);
    Integer getPriceSum(Long carId);
    Integer getPriceSumByYear(Long carId, Integer year);
    Integer getTraveledDistance(Long carId);
    Integer getTraveledDistanceByYear(Long carId,Integer year);
    List<Cost> findFuelings(Long carId);
    List<Cost> findFuelingsByYear(Long carId, Integer year);
    List<CategoryStat> getCategoryStat(Long carId);
    List<CategoryStat> getCategoryStatByYear(Long carId,Integer year);
    List<Integer> findDistinctYearsByCarId(Long carId);
    List<Cost> findAllCostsWithMileageByCarIdAndYear(Long carId, Integer year);
    void delete(Cost cost);
}
