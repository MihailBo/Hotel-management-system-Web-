package com.myCompany.hotel.hotel_management_system.Models;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    private String userName;
    private String password;
    private String email;
    private LocalDateTime created_at = LocalDateTime.now();
}