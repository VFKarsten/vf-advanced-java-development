package com.ecommerce.service;


import com.ecommerce.model.Role;
import com.ecommerce.repo.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepo repo;
    public Role createRole (Role roles) {

        return repo.save(roles);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
