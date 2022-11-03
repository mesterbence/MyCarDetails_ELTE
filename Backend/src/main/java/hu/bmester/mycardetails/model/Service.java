package hu.bmester.mycardetails.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "car", referencedColumnName = "id")
    private Car car;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "mileage")
    private Integer mileage;

    @Column(name = "note")
    private String note;
}
