package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findServicesByCar_Id(Long carId);

    @Query("SELECT s" +
            " FROM Service s" +
            " WHERE s.car.id = :carId AND ((SELECT MAX(c.mileage) FROM Cost c where c.car.id = :carId) > s.mileage-1500 AND (SELECT MAX(c.mileage) FROM Cost c where c.car.id = :carId) < s.mileage)")
    List<Service> findActualServicesByCar_Id(Long carId);
}
