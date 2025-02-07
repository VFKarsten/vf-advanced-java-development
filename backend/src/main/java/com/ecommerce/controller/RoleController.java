package com.ecommerce.controller;

import com.ecommerce.model.Role;
import com.ecommerce.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
    public class RoleController {
        @Autowired
            RoleService service;
        @PostMapping
            public Role createRole(@RequestBody Role role) {

            return service.createRole(role);
    }

    //Delete role by id
    @GetMapping(path = "/byRoleId/{id}")
    public String deleteById (@PathVariable("id") Long id) {
        service.deleteById(id);
        return "Delete by id called";
    }
}