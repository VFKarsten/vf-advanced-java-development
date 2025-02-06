package com.ecommerce.repo;

import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepo extends JpaRepository <User, Long> {
    String sql1="select u.name from User u JOIN u.role r where r.id=:roleId";
    @Query(sql1)
    List<String> findByRoleId(@Param("roleId")  Long role_id);
}
