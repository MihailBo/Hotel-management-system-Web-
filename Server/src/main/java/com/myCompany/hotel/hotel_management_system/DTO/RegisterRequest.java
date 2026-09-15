package com.myCompany.hotel.hotel_management_system.DTO;

import lombok.Data;

@Data
public class RegisterRequest {

    private String userName;

    private String password;

    private String email;
}

