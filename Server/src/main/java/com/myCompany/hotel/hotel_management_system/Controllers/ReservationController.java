package com.myCompany.hotel.hotel_management_system.Controllers;


import com.myCompany.hotel.hotel_management_system.DTO.reservation.ReservationCreateRequest;
import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import com.myCompany.hotel.hotel_management_system.Models.Room;
import com.myCompany.hotel.hotel_management_system.Models.User;
import com.myCompany.hotel.hotel_management_system.Repositoris.ReservationRepository;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomRepository;
import com.myCompany.hotel.hotel_management_system.Services.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.myCompany.hotel.hotel_management_system.Repositoris.UserRepository;

import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class ReservationController {

    private final ReservationService reservationService;

    ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> GetAll(){

        return ResponseEntity.ok(reservationService.GetAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> GetById(@PathVariable("id") Long id){
        return ResponseEntity.ok(reservationService.GetById(id));
    }

    @PostMapping
    public ResponseEntity<?> Post(
            @AuthenticationPrincipal UserDetails userdetails,
            @RequestBody ReservationCreateRequest reservationCreateRequest
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reservationService.Post(userdetails,reservationCreateRequest));
    }

    @PutMapping("/{id}")
    // TODO: dto
    public ResponseEntity<?> Put(@PathVariable("id") Long id, Reservation newReservation, UserDetails userDetails){
          return ResponseEntity.ok(reservationService.Put(id, newReservation, userDetails)) ;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> Delete(@PathVariable("id") Long id){
        reservationService.Delete(id);
        return ResponseEntity.noContent().build();
    }
}
