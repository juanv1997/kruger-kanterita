package com.kruger.project.vacunacionkrugerbackend.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "registro_vacunacion")
public class RegistroVacunacion {

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registro_vacunacion_id")
    private long id;

    @JoinColumn(name = "usuario_id", nullable = false)
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @Getter
    @Setter
    private Usuario usuario;

    @Getter
    @Setter
    @JoinColumn(name = "tipo_vacuna_id", nullable = false)
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private TipoVacuna tipoVacuna;

    @Getter
    @Setter
    @Column(name = "registro_vacunacion_fecha",length = 60)
    private String fecha;

    @Getter
    @Setter
    @Column(name = "registro_vacunacion_numero_dosis",length = 10)
    private String numero_dosis;




}
