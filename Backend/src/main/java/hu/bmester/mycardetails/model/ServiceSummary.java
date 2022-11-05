package hu.bmester.mycardetails.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceSummary {
    private Long carId;
    private Integer serviceSum;
}
