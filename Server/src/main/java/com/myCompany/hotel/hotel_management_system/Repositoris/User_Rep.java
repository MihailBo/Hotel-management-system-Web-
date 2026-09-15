package com.myCompany.hotel.hotel_management_system.Repositories;

import com.myCompany.hotel.hotel_management_system.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface User_Rep extends JpaRepository<User, Long> {

    Optional<User> findByUserName(String userName);

    Optional<User> findByEmail(String email);
}


