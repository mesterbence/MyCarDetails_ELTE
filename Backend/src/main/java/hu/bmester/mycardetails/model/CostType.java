package hu.bmester.mycardetails.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cost_types")
public class CostType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;
}
