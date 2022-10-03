package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    Car findCarByNumberplate(String numberplate);
    List<Car> findCarsByOwner(User owner);
    Car findCarById(Long id);
}
