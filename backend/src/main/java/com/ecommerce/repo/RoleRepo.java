package com.ecommerce.repo;


import com.ecommerce.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Long> {
    String sqlByRoleName ="select r.id from Role r where r.role=:userRole";
    @Query(sqlByRoleName)
    Optional<Long> findUserRole(@Param("userRole") String userRole);
}
