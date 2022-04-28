package com.kruger.project.vacunacionkrugerbackend.controllers;

import com.kruger.project.vacunacionkrugerbackend.dao.UsuarioDao;
import com.kruger.project.vacunacionkrugerbackend.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping (value = "usuario/{id}")
    public Usuario getUsuarioById(@PathVariable int id){
        return usuarioDao.getUsuarioById(id);

    }

    @RequestMapping (value = "usuario")
    public List<Usuario> getUsuario (){

        return usuarioDao.getUsuarios();

    }
    @RequestMapping (value = "usuario",method = RequestMethod.POST )
    public void saveUsuario (@RequestBody Usuario usuario){
        usuarioDao.saveUsuario(usuario);
    }


}
