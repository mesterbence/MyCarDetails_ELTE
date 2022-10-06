package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CostType;

import java.util.List;


public interface CostTypeService {
    CostType findCostById(int typeId);
    List<CostType> findAllCostTypes();
}
