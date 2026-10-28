package com.myCompany.hotel.hotel_management_system.Models;

import jakarta.persistence.*;
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

    @ManyToOne
    User user;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNum;

    @ManyToOne
    private Room room;

    private Double totalPrice;
    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime check_in;
    private LocalDateTime check_out;

}
