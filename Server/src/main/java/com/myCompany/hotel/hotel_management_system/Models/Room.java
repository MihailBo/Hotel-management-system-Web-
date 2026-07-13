package com.myCompany.hotel.hotel_management_system.Models;

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
    @ManyToOne
    @JoinColumn(name = "room_type_id") // foreign key
    private Room_type roomType;


}


