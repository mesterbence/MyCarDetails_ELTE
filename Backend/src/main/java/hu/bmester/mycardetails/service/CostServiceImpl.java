package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CategoryStat;
import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.model.FuelingStat;
import hu.bmester.mycardetails.repository.CostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<CategoryStat> getCategoryStat(Long carId) {
        return costRepository.getCategoryStat(carId);
    }

    @Override
    public List<Integer> findDistinctYearsByCarId(Long carId) {
        return costRepository.findDistinctYearsByCarId(carId);
    }

    @Override
    public Integer getPriceSumByYear(Long carId, Integer year) {
        return costRepository.getSumByYear(carId,year);
    }

    @Override
    public Integer getTraveledDistanceByYear(Long carId, Integer year) {
        return costRepository.getTraveledDistanceByYear(carId,year);
    }

    @Override
    public List<Cost> findFuelingsByYear(Long carId, Integer year) {
        return costRepository.findFuelingsByYear(carId, year);
    }
}
