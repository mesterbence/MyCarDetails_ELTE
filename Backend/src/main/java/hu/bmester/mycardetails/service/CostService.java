package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Cost;

import java.util.List;

public interface CostService {
    List<Cost> findAllCosts();
    List<Cost> findByCarId(Long carId);
    Cost saveCost(Cost cost);
    Integer getPriceSum(Long carId);
    Integer getTraveledDistance(Long carId);
}
