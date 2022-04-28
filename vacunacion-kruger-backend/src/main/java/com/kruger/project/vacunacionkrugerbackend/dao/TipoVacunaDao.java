package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.TipoVacuna;

import java.util.List;

public interface TipoVacunaDao {

    List<TipoVacuna> getTipoVacunas();

    TipoVacuna getTipoVacunaById(long id);

    void saveTipoVacuna(TipoVacuna tipoVacuna);
}
