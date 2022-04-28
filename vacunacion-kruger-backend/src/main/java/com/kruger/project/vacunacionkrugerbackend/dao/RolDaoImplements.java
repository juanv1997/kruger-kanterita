package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.Rol;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class RolDaoImplements implements RolDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Rol getRolById(long id) {
        return entityManager.find(Rol.class,id);
    }

    @Override
    public List<Rol> getRoles() {
        String query = "FROM Rol";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void saveRol(Rol rol) {
        entityManager.merge(rol);
    }
}
