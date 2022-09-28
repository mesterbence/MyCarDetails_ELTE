package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
    Car findCarByNumberplate(String numberplate);
}
