package com.ecommerce.controller;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.model.User;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
    public class UserController {
        @Autowired
        UserService service;

        @PostMapping
            public User createUser(@RequestBody User user) {

            return service.createOrUpdateUser(user);
    }

    //Update User attribute by id
    @PostMapping(path = "/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
            user.setId(id);
            return service.createOrUpdateUser(user);
    }
    //Get User via name and password
    @PostMapping("/authenticate")
    public User authenticate (@RequestParam String name, @RequestParam String password) throws ResourceNotFoundException, UnauthorizedException {

            return service.authenticateUser(name, password);
    }

    @GetMapping(path = "/byUserId/{id}")
    public Optional<User> getUsers(@PathVariable Long id){

            return service.findById(id);
    }

    @GetMapping(path = "/byRoleId/{id}")
    public List<String> getUserByRoleId(@PathVariable Long id){

            return service.findByRoleId(id);
    }

    //Delete User by Id
    @DeleteMapping(path = "/byUserId/{id}")
    public String deleteById(@PathVariable("id") Long id){
            service.deleteById(id);
            return "Delete by id is called";
    }

}
