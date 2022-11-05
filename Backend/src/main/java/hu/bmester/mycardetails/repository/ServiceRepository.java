package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findServicesByCar_Id(Long carId);
}
