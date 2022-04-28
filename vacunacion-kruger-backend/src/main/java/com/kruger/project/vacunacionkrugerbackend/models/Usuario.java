package com.kruger.project.vacunacionkrugerbackend.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
@Entity
@Table(name = "usuario")
public class Usuario {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private long id;

    @JoinColumn(name = "rol_id", nullable = false)
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @Getter @Setter
    private Rol rol;

    @Getter
    @Setter
    @Column(name = "usuario_cedula",length = 10, nullable = false)
    private String cedula;

    @Getter
    @Setter
    @Column(name = "usuario_nombres",length = 20, nullable = false)
    private String nombres;

    @Getter
    @Setter
    @Column(name = "usuario_apellidos",length = 20, nullable = false)
    private String apellidos;

    @Getter
    @Setter
    @Column(name = " usuario_email",length = 50, nullable = false)
    private String email;

    @Getter
    @Setter
    @Column(name = "usuario_fecha_nacimiento",length = 60)
    private String fechaNacimiento;

    @Getter
    @Setter
    @Column(name = "usuario_direccion",length = 60)
    private String direccion;

    @Getter
    @Setter
    @Column(name = "usuario_celular",length = 10)
    private String celular;

    @Getter
    @Setter
    @Column(name ="usuario_clave",length = 30)
    private String clave;

    @Getter
    @Setter
    @Column(name = "usuario_estado_vacunacion",length = 10)
    private String estadoVacunacion;


}
