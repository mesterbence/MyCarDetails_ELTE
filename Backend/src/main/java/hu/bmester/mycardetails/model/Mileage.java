package hu.bmester.mycardetails.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class Mileage {
    private Date date;
    private Integer mileage;
}
