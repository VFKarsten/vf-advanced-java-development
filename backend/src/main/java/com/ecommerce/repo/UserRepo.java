package com.ecommerce.repo;

import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository <User, Long> {
    String sql1="select u.name from User u JOIN u.role r where r.id=:roleId";
    @Query(sql1)
    List<String> findByRoleId(@Param("roleId")  Long role_id);

    String sqlByName="select user id, user name, user password, user role from User user where user.name=:name";
    @Query(sqlByName)
    Optional<User> findByName(@Param("name") String name);

    boolean existsByName(String name);
}
