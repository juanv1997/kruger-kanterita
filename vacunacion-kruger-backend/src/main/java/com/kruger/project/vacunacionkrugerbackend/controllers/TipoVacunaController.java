package com.kruger.project.vacunacionkrugerbackend.controllers;

import com.kruger.project.vacunacionkrugerbackend.dao.TipoVacunaDao;
import com.kruger.project.vacunacionkrugerbackend.models.TipoVacuna;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TipoVacunaController {

    @Autowired
    private TipoVacunaDao tipoVacunaDao;

    @RequestMapping (value = "tipovacuna/{id}")
    public TipoVacuna getTipoVacunaById(@PathVariable long id){
        return tipoVacunaDao.getTipoVacunaById(id);

    }

    @RequestMapping (value = "tipovacuna")
    public List<TipoVacuna> getTipoVacuna (){

        return tipoVacunaDao.getTipoVacunas();

    }
    @RequestMapping (value = "tipovacuna",method = RequestMethod.POST )
    public void saveTipoVacuna (@RequestBody TipoVacuna tipoVacuna){

        tipoVacunaDao.saveTipoVacuna(tipoVacuna);
    }
}
