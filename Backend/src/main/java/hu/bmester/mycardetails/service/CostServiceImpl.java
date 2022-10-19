package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.repository.CostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CostServiceImpl implements CostService {

    @Autowired
    private CostRepository costRepository;

    @Override
    public List<Cost> findAllCosts() {
        return costRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    @Override
    public List<Cost> findByCarId(Long carId) { return costRepository.findCostsByCarIdOrderByDateDesc(carId); }

    @Override
    public Cost saveCost(Cost cost) {
        return costRepository.save(cost);
    }

    @Override
    public Integer getPriceSum(Long carId) {
        return costRepository.getSum(carId);
    }

    @Override
    public Integer getTraveledDistance(Long carId) {
        return costRepository.getTraveledDistance(carId);
    }

    @Override
    public List<Cost> findFuelings(Long carId) {
        return costRepository.findCostsByFuelingIsNotNullAndCarIdOrderByDateDesc(carId);
    }

    @Override
    public List<Cost> findAllCostsWithMileage(Long carId) {
        return costRepository.findCostsByCarIdAndAndMileageIsNotNullOrderByDate(carId);
    }

    @Override
    public List<Object> getCategoryStat(Long carId) {
        return costRepository.getCategoryStat(carId);
    }
}
