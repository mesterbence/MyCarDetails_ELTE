package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.model.Fueling;
import hu.bmester.mycardetails.model.FuelingCostResponse;

import java.sql.Timestamp;
import java.util.List;

public interface FuelingService {
    Double getFuelSum(Long carId);
    Double getFuelSumByYear(Long carId, Integer year);
    Fueling findFirstByCost_Car(Car car);
    Fueling findFirstByCost_CarDesc(Car car);
    List<FuelingCostResponse> findLastThreeFuelingsByFuelingData(Long carId, Timestamp date, Integer mileage);
    void delete(Fueling fueling);
    Fueling findFuelingById(Long id);
}
