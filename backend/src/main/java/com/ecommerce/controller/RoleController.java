package com.ecommerce.controller;

import com.ecommerce.model.Role;
import com.ecommerce.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
    public class RoleController {
        @Autowired
            RoleService service;
        @PostMapping
            public Role createRole(@RequestBody Role role) {

            return service.createRole(role);
    }
}