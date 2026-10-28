package com.myCompany.hotel.hotel_management_system.Models;

import com.myCompany.hotel.hotel_management_system.Enums.RoomTypes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.ORDINAL)
    private RoomTypes type;
    private String description;
    private String imageUrl;

}
