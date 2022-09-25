package hu.bmester.mycardetails.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "fuelings")
public class Fueling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cost", referencedColumnName = "id")
    private Cost cost;

    @Column(name = "quantity")
    private double quantity;

    @ManyToOne
    @JoinColumn(name = "type", referencedColumnName = "id")
    private FuelType type;

    @Column(name = "ispremium")
    private Boolean isPremium;
}
