package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.Rol;

import java.util.List;

public interface RolDao {


    Rol getRolById(int id);

    List<Rol> getRoles();

    void saveRol(Rol rol);
}
