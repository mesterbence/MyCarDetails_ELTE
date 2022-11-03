package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public List<hu.bmester.mycardetails.model.Service> findAllServices() {
        return serviceRepository.findAll();
    }

}
