package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findServicesByCar_Id(Long carId);

    @Query(value = "SELECT s.*" +
            " FROM Services s" +
            " WHERE s.car = :carId AND (s.done IS NULL OR s.done IS FALSE) AND ((SELECT MAX(c.mileage) FROM Costs c where c.car = :carId) > s.mileage-1500 OR (now()+INTERVAL '15 day') > s.date)",
            nativeQuery = true)
    List<Service> findActualServicesByCar_Id(Long carId);
}
