package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.Usuario;

import java.util.List;

public interface UsuarioDao {

    Usuario getUsuarioById(int id);

    List<Usuario> getUsuarios();

    void saveUsuario(Usuario usuario);

    boolean checkUserCredentials(Usuario usuario);


}
