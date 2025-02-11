package com.ecommerce.controller;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.model.User;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
    public class UserController {
        @Autowired
        UserService service;

    //Add User
    @PostMapping("/add")
    public User createUser (@RequestBody User user) throws ResourceNotFoundException {
        return service.createOrUpdateUser(user);
    }

    //Update User attribute by id
    @PostMapping(path = "/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) throws ResourceNotFoundException {
        user.setId(id);
        return service.createOrUpdateUser(user);
    }
 
    //Get User via name and password
    @PostMapping("/authenticate")
    public User authenticate (@RequestBody User user) throws ResourceNotFoundException, UnauthorizedException {
        return service.authenticateUser(user.getName(), user.getPassword());
    }

    @GetMapping(path = "/byUserId/{id}")
    public Optional<User> getUsers(@PathVariable Long id){

            return service.findById(id);
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users=service.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
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
