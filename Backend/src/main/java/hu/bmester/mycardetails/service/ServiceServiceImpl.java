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

    @Override
    public hu.bmester.mycardetails.model.Service saveService(hu.bmester.mycardetails.model.Service service) {
        return serviceRepository.save(service);
    }

    @Override
    public List<hu.bmester.mycardetails.model.Service> findServicesByCarId(Long carId) {
        return serviceRepository.findServicesByCar_IdOrderByDate(carId);
    }

    @Override
    public List<hu.bmester.mycardetails.model.Service> findActualServicesByCarId(Long carId) {
        return serviceRepository.findActualServicesByCar_Id(carId);
    }

    @Override
    public hu.bmester.mycardetails.model.Service findServiceById(Long serviceId) {
        return serviceRepository.findServiceById(serviceId);
    }

    @Override
    public void delete(hu.bmester.mycardetails.model.Service service) {
        serviceRepository.deleteById(service.getId());
    }

    @Override
    public hu.bmester.mycardetails.model.Service findNextMOT(Long carId) {
        return serviceRepository.findNextMOT(carId);
    }
}
