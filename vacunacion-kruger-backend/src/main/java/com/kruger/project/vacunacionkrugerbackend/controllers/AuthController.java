package com.kruger.project.vacunacionkrugerbackend.controllers;

import com.kruger.project.vacunacionkrugerbackend.dao.UsuarioDao;
import com.kruger.project.vacunacionkrugerbackend.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping (value = "login",method = RequestMethod.POST )
    public ResponseEntity<String> login (@RequestBody Usuario usuario){
        if (usuarioDao.checkUserCredentials(usuario)){
            return new ResponseEntity<String>("OK",HttpStatus.OK);
        }else{
            return new ResponseEntity<String>("BAD_REQUEST",HttpStatus.BAD_REQUEST);
        }
    }
}
