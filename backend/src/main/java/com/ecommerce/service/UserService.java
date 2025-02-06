package com.ecommerce.service;


import com.ecommerce.model.User;
import com.ecommerce.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public User createUser(User user) {
        return repo.save(user);
    }

    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }

    public List<String> findByRoleId(Long id) {
        return repo.findByRoleId(id);
    }

}
