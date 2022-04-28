package com.kruger.project.vacunacionkrugerbackend.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "rol_id")
    private long id;

    @Getter
    @Setter
    @Column(name = "rol_nombre",length = 50)
    private String nombre;

    @Getter
    @Setter
    @Column(name = "rol_descrip",length = 100)
    private String descrip;

}
