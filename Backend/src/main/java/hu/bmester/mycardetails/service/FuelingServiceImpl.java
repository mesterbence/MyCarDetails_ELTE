package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.repository.FuelingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class FuelingServiceImpl implements FuelingService {

    @Autowired
    private FuelingRepository fuelingRepository;

    @Override
    public Double getFuelSum(Long carId) {
        return fuelingRepository.getSum(carId);
    }
}
