package com.ecommerce.service;


import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;


    public User createOrUpdateUser(User user) {

        return repo.save(user);
    }

    public Optional<User> findById(Long id) {

        return repo.findById(id);
    }

    public List<String> findByRoleId(Long id) {

        return repo.findByRoleId(id);
    }

    public void deleteById(Long id){

        repo.deleteById(id);
    }

    public User authenticateUser(String name, String password) throws ResourceNotFoundException, UnauthorizedException {
        Optional<User> user = repo.findByName(name);

        if (user.isPresent()){
            if (!user.get().getPassword().equals(password)){
                //password don't match: raise exception
                throw new UnauthorizedException("username or password not correct");
            }
        }
        else
            throw new ResourceNotFoundException("user not found");
        return user.get();
        }

    public List<User> getAllUsers() {

        return repo.findAll();
    }

}
