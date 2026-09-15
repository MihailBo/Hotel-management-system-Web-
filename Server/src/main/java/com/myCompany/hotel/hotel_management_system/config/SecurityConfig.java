
package com.myCompany.hotel.hotel_management_system.config;

import com.myCompany.hotel.hotel_management_system.Models.User;
import com.myCompany.hotel.hotel_management_system.Repositories.User_Rep;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

    @Configuration
    public class SecurityConfig {

        private final User_Rep userRep;

        public SecurityConfig(User_Rep userRep) {
            this.userRep = userRep;
        }


        // BCrypt
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }


        // Finds the user in our database
        @Bean
        public UserDetailsService userDetailsService() {

            return username -> {

                User user = userRep.findByUserName(username)
                        .orElseThrow(() ->
                                new RuntimeException("User not found.")
                        );

                return new org.springframework.security.core.userdetails.User(
                        user.getUserName(),
                        user.getPassword(),
                        List.of(
                                new SimpleGrantedAuthority("ROLE_USER")
                        )
                );
            };
        }


        // Authentication provider
        @Bean
        public DaoAuthenticationProvider authenticationProvider(
                UserDetailsService userDetailsService,
                PasswordEncoder passwordEncoder) {

            DaoAuthenticationProvider provider =
                    new DaoAuthenticationProvider(userDetailsService);

            provider.setPasswordEncoder(passwordEncoder);

            return provider;
        }


        // AuthenticationManager
        @Bean
        public AuthenticationManager authenticationManager(
                DaoAuthenticationProvider authenticationProvider) {

            return authenticationProvider::authenticate;
        }


        // Security rules
        @Bean
        public SecurityFilterChain securityFilterChain(
                HttpSecurity http) throws Exception {

            http
                    .csrf(csrf -> csrf.disable())

                    .cors(cors -> {})

                    .authorizeHttpRequests(auth -> auth

                            // Anyone can register
                            .requestMatchers("/auth/register")
                            .permitAll()

                            // Anyone can login
                            .requestMatchers("/auth/login")
                            .permitAll()

                            // Everything else requires login
                            .anyRequest()
                            .authenticated()
                    )

                    // We are creating our own /auth/login
                    .formLogin(form -> form.disable())

                    // We are not using HTTP Basic authentication
                    .httpBasic(basic -> basic.disable());

            return http.build();
        }
    }