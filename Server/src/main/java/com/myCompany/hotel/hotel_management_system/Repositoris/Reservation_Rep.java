package com.myCompany.hotel.hotel_management_system.Repositoris;

import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface Reservation_Rep extends JpaRepository<Reservation, Long> {
    @Query( "SELECT r " +
            "FROM Reservation r " +
            "WHERE r.check_in < :checkOut AND r.check_out > :checkIn")
    List<Reservation> findOverlappingReservations(
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut
    );
}
