package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CategoryStat;
import hu.bmester.mycardetails.model.Cost;

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
    List<CategoryStat> getCategoryStat(Long carId);
    List<Integer> findDistinctYearsByCarId(Long carId);
}
