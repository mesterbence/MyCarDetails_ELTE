package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findServicesByCar_IdOrderByDate(Long carId);
    Service findServiceById(Long serviceId);

    @Query(value = "SELECT s.*" +
            " FROM Services s" +
            " WHERE s.car = :carId AND (s.done IS NULL OR s.done IS FALSE) AND ((SELECT MAX(c.mileage) FROM Costs c where c.car = :carId) > s.mileage-1500 OR (now()+INTERVAL '15 day') > s.date) ORDER BY s.date DESC",
            nativeQuery = true)
    List<Service> findActualServicesByCar_Id(Long carId);

    @Query(value = "select s.* from services s where car=:carId AND (done IS NULL OR done IS FALSE) and lower(note) like '%műszaki%' order by DATE_PART('day', date - now()) limit 1",
            nativeQuery = true)
    Service findNextMOT(Long carId); // Ministry of Transport = MOT = Műszaki
}
