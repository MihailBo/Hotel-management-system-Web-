package com.myCompany.hotel.hotel_management_system.Services;

import com.myCompany.hotel.hotel_management_system.DTO.RegisterRequest;
import com.myCompany.hotel.hotel_management_system.Models.User;
import com.myCompany.hotel.hotel_management_system.Repositories.User_Rep;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final User_Rep userRep;
    private final PasswordEncoder passwordEncoder;

    public AuthService(User_Rep userRep,
                       PasswordEncoder passwordEncoder) {
        this.userRep = userRep;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest request) {

        if (userRep.findByUserName(request.getUserName()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }

        if (userRep.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        User user = new User();

        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());

        // NEVER save the plain password
        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(hashedPassword);

        return userRep.save(user);
    }
}

