package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Repositoris.Room_Rep;
import com.myCompany.hotel.hotel_management_system.Models.Room;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.myCompany.hotel.hotel_management_system.Enums.OrderStatus.AVAILABLE;
import static com.myCompany.hotel.hotel_management_system.Enums.OrderStatus.OCCUPIED;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:63344")
public class Room_Controller {
    public Room_Rep repo;
    
    public Room_Controller(Room_Rep repo){
        this.repo = repo;


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
     room.setStatus(updatedRoom.getStatus());
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

        if (!room.getStatus().equals(AVAILABLE)) {
            throw new RuntimeException("Room is not available");
        }

        room.setStatus(OCCUPIED);
        return repo.save(room);
    }
}
