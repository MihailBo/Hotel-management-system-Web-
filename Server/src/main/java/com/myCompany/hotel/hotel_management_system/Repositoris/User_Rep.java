package com.myCompany.hotel.hotel_management_system.Repositoris;

import com.myCompany.hotel.hotel_management_system.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_Rep extends JpaRepository<User, Long> {
}
