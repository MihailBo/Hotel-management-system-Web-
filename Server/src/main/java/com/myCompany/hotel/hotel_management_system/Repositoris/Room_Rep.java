package com.myCompany.hotel.hotel_management_system.Repositoris;

import com.myCompany.hotel.hotel_management_system.Models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Room_Rep extends JpaRepository<Room, Long> {
    List<Room> findByRoomType_Id(Long roomTypeId);
}
