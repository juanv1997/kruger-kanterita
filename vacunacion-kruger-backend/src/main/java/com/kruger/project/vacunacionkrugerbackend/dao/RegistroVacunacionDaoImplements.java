package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.RegistroVacunacion;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class RegistroVacunacionDaoImplements implements RegistroVacunacionDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<RegistroVacunacion> getRegistrosVacunacion() {
        String query = "FROM RegistroVacunacion";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public RegistroVacunacion getRegistroVacuancionById(long id) {
        return entityManager.find(RegistroVacunacion.class,id);
    }

    @Override
    public void saveRegistroVacunacion(RegistroVacunacion registro) {
        entityManager.merge(registro);
    }
}
