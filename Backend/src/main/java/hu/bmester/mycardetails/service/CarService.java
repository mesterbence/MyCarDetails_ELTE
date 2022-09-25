package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Car;

import java.util.List;

public interface CarService {
    List<Car> findAllCars();
}
