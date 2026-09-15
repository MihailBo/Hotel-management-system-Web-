package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Repositoris.Reservation_Rep;
import com.myCompany.hotel.hotel_management_system.Repositoris.Room_Rep;
import com.myCompany.hotel.hotel_management_system.Models.Room;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:3000")
public class Room_Controller {
    public Room_Rep repo;
    public Reservation_Rep reservationRepo;

    public Room_Controller(Room_Rep repo, Reservation_Rep reservationRepo){
        this.repo = repo;
        this.reservationRepo = reservationRepo;
    }
    @GetMapping
    public List<Room> GetAll(){

        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Room> GetById(@PathVariable("id") Long id){

        return repo.findById(id);
    }

    @PostMapping
    public Room Add(@RequestBody Room room){

        return repo.save(room);
    }

    @PutMapping("/{id}")
    public Room PutById(@PathVariable("id") Long id, @RequestBody Room updatedRoom){
     Room room = repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found."));
     room.setRoomNum(updatedRoom.getRoomNum());
     room.setPricePerNight(updatedRoom.getPricePerNight());
     return repo.save(room);
    }

    @DeleteMapping("/{id}")
    void Delete(@PathVariable("id") Long id){
        repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        repo.deleteById(id);

    }

    @PostMapping("/{id}/book")
    public Room bookRoom(@PathVariable("id") Long id) {

        Room room = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return repo.save(room);
    }

    @GetMapping("/availability")
    public Map<String, Object> checkAvailability(
            @RequestParam Long roomTypeId,
            @RequestParam String checkIn,
            @RequestParam String checkOut
    ) {

        LocalDate checkInDate = LocalDate.parse(checkIn);
        LocalDate checkOutDate = LocalDate.parse(checkOut);

        if (!checkOutDate.isAfter(checkInDate)) {
            throw new IllegalArgumentException(
                    "Check-out date must be after check-in date."
            );
        }

        LocalDateTime checkInDateTime =
                checkInDate.atStartOfDay();

        LocalDateTime checkOutDateTime =
                checkOutDate.atStartOfDay();


        // Всички стаи от избрания тип
        List<Room> rooms =
                repo.findByRoomType_Id(roomTypeId);


        // Всички резервации, които се застъпват
        List<com.myCompany.hotel.hotel_management_system.Models.Reservation> reservations =
                reservationRepo
                        .findOverlappingReservations(
                                checkOutDateTime,
                                checkInDateTime
                        );


        // Броим само резервациите за стаи
        // от избрания тип
        long occupiedRooms = reservations.stream()
                .filter(reservation ->
                        rooms.stream().anyMatch(room ->
                                room.getId().equals(
                                        reservation.getRoom_id()
                                )
                        )
                )
                .count();


        int totalRooms = rooms.size();

        long availableRooms =
                totalRooms - occupiedRooms;


        Map<String, Object> response = new HashMap<>();

        response.put("roomTypeId", roomTypeId);
        response.put("checkIn", checkIn);
        response.put("checkOut", checkOut);
        response.put("totalRooms", totalRooms);
        response.put("occupiedRooms", occupiedRooms);
        response.put("availableRooms", availableRooms);

        return response;
    }
}
