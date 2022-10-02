package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.User;

import java.util.List;

public interface CarService {
    List<Car> findAllCars();
    Car createCar(Car car);
    Car findCarByNumberplate(String numberplate);
    List<Car> findCarsByOwner(User owner);
}
