package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.Fueling;

public interface FuelingService {
    Double getFuelSum(Long carId);
    Fueling findFirstByCost_Car(Car car);
    Fueling findFirstByCost_CarDesc(Car car);
}
