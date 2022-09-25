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

    @Column(name = "type")
    private int type; //TODO: átalakítás typepá

    @Column(name = "car")
    private Long car; //TODO: átalakítás carrá

    @Column(name = "price")
    private int price;

    @Column(name = "mileage")
    private int mileage;

    @Column(name = "note")
    private String note;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "title")
    private String title;
}
