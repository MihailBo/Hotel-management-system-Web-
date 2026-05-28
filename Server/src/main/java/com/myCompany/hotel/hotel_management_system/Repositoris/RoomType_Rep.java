package com.myCompany.hotel.hotel_management_system.Repositoris;

import com.myCompany.hotel.hotel_management_system.Models.Room_type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomType_Rep extends JpaRepository<Room_type, Long> {
}
