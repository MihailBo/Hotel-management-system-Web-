package com.myCompany.hotel.hotel_management_system.Repositoris;

import com.myCompany.hotel.hotel_management_system.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Customer_Rep extends JpaRepository<Customer, Long> {

}
