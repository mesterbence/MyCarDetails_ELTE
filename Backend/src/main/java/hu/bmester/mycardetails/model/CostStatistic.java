package hu.bmester.mycardetails.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CostStatistic {
    Integer priceSum;
    Double fuelingSum;
    Integer mileageSum;
    Double consumption;
}
