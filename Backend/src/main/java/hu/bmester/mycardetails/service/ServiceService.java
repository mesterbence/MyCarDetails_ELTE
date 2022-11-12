package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.Service;

import java.util.List;

public interface ServiceService {
    List<Service> findAllServices();
    Service saveService(Service service);
    List<Service> findServicesByCarId(Long carId);
    List<Service> findActualServicesByCarId(Long carId);
    Service findServiceById(Long serviceId);
}
