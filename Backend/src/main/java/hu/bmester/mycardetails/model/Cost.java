package hu.bmester.mycardetails.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "costs")
public class Cost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "type", referencedColumnName = "id")
    private CostType type;

    @ManyToOne
    @JoinColumn(name = "car", referencedColumnName = "id")
    private Car car;

    @Column(name = "price")
    private Integer price;

    @Column(name = "mileage")
    private Integer mileage;

    @Column(name = "note")
    private String note;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "title")
    private String title;
}
