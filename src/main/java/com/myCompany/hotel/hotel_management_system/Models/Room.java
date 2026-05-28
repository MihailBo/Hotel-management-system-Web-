package com.myCompany.hotel.hotel_management_system.Models;

import com.myCompany.hotel.hotel_management_system.Enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int roomNum;
    private double pricePerNight;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}


