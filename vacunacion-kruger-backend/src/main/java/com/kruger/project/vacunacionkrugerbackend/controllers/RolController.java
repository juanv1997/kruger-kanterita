package com.kruger.project.vacunacionkrugerbackend.controllers;

import com.kruger.project.vacunacionkrugerbackend.dao.RolDao;
import com.kruger.project.vacunacionkrugerbackend.models.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RolController {

    @Autowired
    private RolDao rolDao;

    @RequestMapping (value = "rol/{id}")
    public Rol getRolById(@PathVariable int id){
        return rolDao.getRolById(id);

    }

    @RequestMapping (value = "rol")
    public List<Rol> getRoles (){

        return rolDao.getRoles();

    }
    @RequestMapping (value = "rol",method = RequestMethod.POST )
    public void saveRol (@RequestBody Rol rol){

        rolDao.saveRol(rol);
    }
}
