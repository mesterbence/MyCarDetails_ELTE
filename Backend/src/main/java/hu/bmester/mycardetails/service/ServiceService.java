package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.Service;

import java.util.List;

public interface ServiceService {
    List<Service> findAllServices();
    Service saveService(Service service);
}
