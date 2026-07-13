package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Models.Room_type;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomType_Rep;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roomType")
@CrossOrigin(origins = "http://localhost:63344")
public class RoomType_Controller {

    RoomType_Rep repo;

    RoomType_Controller(RoomType_Rep repo){
        this.repo = repo;
    }

    @GetMapping
    List<Room_type> GetAll(){

        return repo.findAll();
    }

    @GetMapping("/{id}")
    Room_type GetById(@PathVariable("id") Long id){
        return  repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
    }

    @PostMapping
    Room_type Post(@RequestBody Room_type roomType){
        return repo.save(roomType);
    }
    @PutMapping
    Room_type Put(@PathVariable("id") Long id, @RequestBody Room_type newRoomType){
        Room_type roomType = repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        roomType.setDescription(newRoomType.getDescription());
        roomType.setName(newRoomType.getName());
        return repo.save(roomType);
    }
    @DeleteMapping("/{id}")
    void Delete(@PathVariable("id") Long id){
        repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        repo.deleteById(id);
    }
}
