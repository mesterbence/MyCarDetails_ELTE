package hu.bmester.mycardetails.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numberplate")
    private String numberplate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner", referencedColumnName = "id")
    private User owner;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @ManyToOne
    @JoinColumn(name = "fuel_type", referencedColumnName = "id")
    private FuelType fuelType;
}
