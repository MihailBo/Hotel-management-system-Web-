package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import com.myCompany.hotel.hotel_management_system.Repositoris.ReservationRepository;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomRepository;
import com.myCompany.hotel.hotel_management_system.Models.Room;
import com.myCompany.hotel.hotel_management_system.Services.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/room")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class RoomController {
   private final RoomService roomService;


    public RoomController(RoomService roomService){
        this.roomService = roomService;

    }
    @GetMapping
    public ResponseEntity<List<Room>> GetAll(){

        return ResponseEntity.ok(roomService.GetAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> GetById(@PathVariable("id") Long id){

        return ResponseEntity.ok(roomService.GetById(id));
    }

    @PostMapping
    public ResponseEntity<?> Add(@RequestBody Room room){

        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.AddRoom(room));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> Put(@PathVariable("id") Long id, @RequestBody Room editedRoom){

        return ResponseEntity.ok(roomService.Put(id, editedRoom));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> Delete(@PathVariable("id") Long id){

        roomService.Delete(id);
        return ResponseEntity.noContent().build();
    }
//
//    @PostMapping("/{id}/book")
//    public Room bookRoom(@PathVariable("id") Long id) {
//
//        Room room = repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Room not found"));
//        return repo.save(room);
//    }

    // TODO: DTO
    @GetMapping("/availability")
    public ResponseEntity<?> checkAvailability(Long roomTypeId, String checkIn, String checkOut) {
        return ResponseEntity.ok(roomService.checkAvailability(roomTypeId, checkIn, checkOut));
    }
}
