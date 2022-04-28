package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.RegistroVacunacion;

import java.util.List;

public interface RegistroVacunacionDao {
    List<RegistroVacunacion> getRegistrosVacunacion();

    RegistroVacunacion getRegistroVacuancionById(long id);

    void saveRegistroVacunacion(RegistroVacunacion registro);
}

