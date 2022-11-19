package hu.bmester.mycardetails.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FuelingCostResult {
    private boolean isBetter;
    private double consumption;
}
