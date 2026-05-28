package com.myCompany.hotel.hotel_management_system.Models;

import com.myCompany.hotel.hotel_management_system.Enums.BookedStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customer_id;
    private Long room_id;
    private Long total_price;
    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime check_in;
    private LocalDateTime check_out;
    private BookedStatus status;
}
