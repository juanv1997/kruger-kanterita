package com.kruger.project.vacunacionkrugerbackend.controllers;


import com.kruger.project.vacunacionkrugerbackend.dao.RegistroVacunacionDao;
import com.kruger.project.vacunacionkrugerbackend.models.RegistroVacunacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistroVacunacionController {

    @Autowired
    private RegistroVacunacionDao registroVacunacionDao;

    @RequestMapping (value = "registrovacunacion/{id}")
    public RegistroVacunacion getRegistroVacuancionById(@PathVariable int id){
        return registroVacunacionDao.getRegistroVacuancionById(id);

    }

    @RequestMapping (value = "registrovacunacion")
    public List<RegistroVacunacion> getRegistrosVacunacion (){

        return registroVacunacionDao.getRegistrosVacunacion();

    }
    @RequestMapping (value = "tregistrovacunacion",method = RequestMethod.POST )
    public void saveRegistroVacunacion (@RequestBody RegistroVacunacion registro){

        registroVacunacionDao.saveRegistroVacunacion(registro);
    }
}
