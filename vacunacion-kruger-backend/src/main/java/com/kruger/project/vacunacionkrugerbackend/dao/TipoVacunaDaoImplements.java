package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.TipoVacuna;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class TipoVacunaDaoImplements implements TipoVacunaDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<TipoVacuna> getTipoVacunas() {
        String query = "FROM TipoVacuna";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public TipoVacuna getTipoVacunaById(long id) {
        return entityManager.find(TipoVacuna.class,id);
    }

    @Override
    public void saveTipoVacuna(TipoVacuna tipoVacuna) {
        entityManager.merge(tipoVacuna);
    }
}
