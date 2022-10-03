package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.CostType;


public interface CostTypeService {
    CostType findCostById(int typeId);
}
