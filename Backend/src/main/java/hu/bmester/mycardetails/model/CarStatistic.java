package hu.bmester.mycardetails.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarStatistic {
    private Integer sumPrice;
    private Integer sumMileage;
    private Double sumFueling;
    private Double pricePerKilometer;
    private Double avgConsumption;
    private Integer selectedYearSum;
    private Double selectedYearMonthlyAvg;
}
