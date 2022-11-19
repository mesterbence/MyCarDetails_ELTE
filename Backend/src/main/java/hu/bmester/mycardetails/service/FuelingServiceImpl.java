package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.model.Fueling;
import hu.bmester.mycardetails.model.FuelingCostResponse;
import hu.bmester.mycardetails.repository.FuelingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;


@Service
public class FuelingServiceImpl implements FuelingService {

    @Autowired
    private FuelingRepository fuelingRepository;

    @Override
    public Double getFuelSum(Long carId) {
        return fuelingRepository.getSum(carId);
    }

    @Override
    public Double getFuelSumByYear(Long carId, Integer year) {
        return fuelingRepository.getSumByYear(carId, year);
    }

    @Override
    public Fueling findFirstByCost_Car(Car car) {
        return fuelingRepository.findFirstByCost_CarOrderByCost_Date(car);
    }

    @Override
    public Fueling findFirstByCost_CarDesc(Car car) {
        return fuelingRepository.findFirstByCost_CarOrderByCost_DateDesc(car);
    }

    @Override
    public List<FuelingCostResponse> findLastThreeFuelingsByFuelingData(Long carId, Timestamp date, Integer mileage) {
        return fuelingRepository.findLastThreeFuelingsByFuelingData(carId,date,mileage);
    }
}
