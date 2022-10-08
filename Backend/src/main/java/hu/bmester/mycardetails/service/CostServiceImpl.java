package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.repository.CostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
    public Integer getSum(Long carId) {
        return costRepository.getSum(carId);
    }
}
