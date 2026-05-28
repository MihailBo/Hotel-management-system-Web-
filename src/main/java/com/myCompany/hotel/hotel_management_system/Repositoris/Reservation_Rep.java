package com.myCompany.hotel.hotel_management_system.Repositoris;

import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import org.hibernate.boot.models.JpaAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Reservation_Rep extends JpaRepository<Reservation, Long> {
}
