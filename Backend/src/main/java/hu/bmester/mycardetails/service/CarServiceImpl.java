package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Override
    public List<Car> findAllCars() {
        return carRepository.findAll();
    }

    @Override
    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public Car findCarByNumberplate(String numberplate) {
        return carRepository.findCarByNumberplate(numberplate);
    }

    @Override
    public List<Car> findCarsByOwner(User owner) {
        return carRepository.findCarsByOwnerOrderById(owner);
    }

    @Override
    public Car findCarById(Long id) {
        return carRepository.findCarById(id);
    }

    @Override
    public Car updateCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void delete(Car car) {
        carRepository.delete(car);
    }
}
