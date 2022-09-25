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

    @Column(name = "cost")
    private Long cost; // TODO: costtá alakítani

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "type")
    private int type; // TODO: typepá alakítani

    @Column(name = "ispremium")
    private Boolean isPremium;
}
