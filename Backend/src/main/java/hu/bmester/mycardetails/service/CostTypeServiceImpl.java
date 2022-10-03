package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CostType;
import hu.bmester.mycardetails.repository.CostTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CostTypeServiceImpl implements CostTypeService {

    @Autowired
    private CostTypeRepository costTypeRepository;

    @Override
    public CostType findCostById(int typeId) {
        return costTypeRepository.findCostTypeById(typeId);
    }
}
