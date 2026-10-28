package com.myCompany.hotel.hotel_management_system.DTO.reservation;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationCreateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNum;
    private Long roomId;
    private LocalDateTime check_in;
    private LocalDateTime check_out;
}

