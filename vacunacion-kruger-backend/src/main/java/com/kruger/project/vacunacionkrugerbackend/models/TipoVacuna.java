package com.kruger.project.vacunacionkrugerbackend.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tipo_vacuna")
public class TipoVacuna {

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tipo_vacuna_id")
    private long id;

    @Getter
    @Setter
    @Column(name = "tipo_vacuna_nombre",length = 15)
    private String nombre;

    @Getter
    @Setter
    @Column(name = "tipo_vacuna_descrip",length = 50)
    private String descrip;

}
