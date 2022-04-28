package com.kruger.project.vacunacionkrugerbackend.dao;

import com.kruger.project.vacunacionkrugerbackend.models.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImplements implements UsuarioDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Usuario getUsuarioById(int id) {
        return entityManager.find(Usuario.class, id);
    }

    @Override
    @Transactional
    public List<Usuario> getUsuarios() {
        String query = "FROM Usuario";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void saveUsuario(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public boolean checkUserCredentials(Usuario usuario) {
        String query = "FROM Usuario WHERE usuario_email= :email AND usuario_clave= :clave ";
        List<Usuario> lista = entityManager.createQuery(query)
                              .setParameter( "email",usuario.getEmail())
                              .setParameter( "clave", usuario.getClave())
                              .getResultList();
       return !lista.isEmpty();
    }
}
