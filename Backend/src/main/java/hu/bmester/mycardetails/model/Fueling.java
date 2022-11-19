package hu.bmester.mycardetails.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "fuelings")
public class Fueling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cost",referencedColumnName = "id")
    @JsonBackReference // infinite loop miatt kell
    private Cost cost;

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "type")
    private String type;

    @Column(name = "ispremium")
    private Boolean isPremium;

    @Column(name = "isfull")
    private Boolean isFull;
}
