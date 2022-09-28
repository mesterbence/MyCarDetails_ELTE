package hu.bmester.mycardetails.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    @NotNull
    private String username;

    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // így a lekérésben nem szerepel, de a settere működik
    @NotNull
    @NotBlank
    @Min(6)
    private String password;

    @Column(name = "email")
    @NotNull
    @NotBlank
    private String email;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;
}
