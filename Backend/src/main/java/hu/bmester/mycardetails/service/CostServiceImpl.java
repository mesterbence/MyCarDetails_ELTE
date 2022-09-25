package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.Cost;
import hu.bmester.mycardetails.repository.CostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CostServiceImpl implements CostService {

    @Autowired
    private CostRepository costRepository;

    @Override
    public List<Cost> findAllCosts() {
        return costRepository.findAll();
    }
}
