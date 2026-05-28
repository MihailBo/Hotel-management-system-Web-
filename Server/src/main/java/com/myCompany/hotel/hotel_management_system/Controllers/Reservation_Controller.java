package com.myCompany.hotel.hotel_management_system.Controllers;


import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import com.myCompany.hotel.hotel_management_system.Repositoris.Reservation_Rep;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class Reservation_Controller {

    private Reservation_Rep repo;
    Reservation_Controller(Reservation_Rep repo){
        this.repo = repo;
    }

    @GetMapping
    List<Reservation> GetAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    Reservation GetById(@PathVariable Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found."));
    }

    @PostMapping
    Reservation Post(@RequestBody Reservation reservation){
        return repo.save(reservation);
    }

    @PutMapping("/{id}")
    Reservation Put(@PathVariable Long id, @RequestBody Reservation newReservation){

        Reservation reservation = repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        reservation.setStatus(newReservation.getStatus());
        reservation.setCheck_in(newReservation.getCheck_in());
        reservation.setCheck_out(newReservation.getCheck_out());
        reservation.setRoom_id(newReservation.getRoom_id());
        reservation.setCustomer_id(newReservation.getCustomer_id());
        reservation.setTotal_price(newReservation.getTotal_price());
        reservation.setCreated_at(newReservation.getCreated_at());
        return repo.save(reservation);
    }

    @DeleteMapping("/{id}")
    void Delete(@PathVariable Long id){
        repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        repo.deleteById(id);
    }
}
