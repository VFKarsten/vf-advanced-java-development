package com.ecommerce.controller;



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
            return service.createUser(user);
    }

    @GetMapping(path = "/byUserId/{id}")
    public Optional<User> getUsers(@PathVariable Long id){
            return service.findById(id);
    }

    @GetMapping(path = "/byRoleId/{id}")
    public List<String> getUserByRoleId(@PathVariable Long id){
        return service.findByRoleId(id);
    }
}
