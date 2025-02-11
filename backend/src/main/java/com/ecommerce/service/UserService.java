package com.ecommerce.service;


import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.repo.RoleRepo;
import com.ecommerce.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private RoleRepo roleRepo;


    public User createOrUpdateUser(User user) throws ResourceNotFoundException {
        Optional<User> originalUser = null;

        if (user.getId() != null) {
            originalUser = repo.findById(user.getId());
        }

        if (user.getRole() == null) {
            // User update withoud given role
            if (originalUser != null) {
                user.setRole(originalUser.get().getRole());
            } else {
                // new user creation.
                Optional<Long> roleId = roleRepo.findUserRole("User");
                if (roleId.isPresent()) {
                    Role role = new Role();
                    role.setId(roleId.get());
                    user.setRole(role);
                }
                else
                    throw new ResourceNotFoundException("Role with role name 'user' not found.");
            }

        }
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

    public User changePassword(Long id, String oldPassword, String newPassword) throws ResourceNotFoundException, UnauthorizedException {
        Optional<User> u = repo.findById(id);
        if (u.isPresent()){
            User user = u.get();
            if (user.getPassword().equals(oldPassword)){
                user.setPassword(newPassword);
                return repo.save(user);
            }
            throw new UnauthorizedException("Old password is not correct!");

        }

        throw new ResourceNotFoundException("No user found with id " + id);
    }
}
