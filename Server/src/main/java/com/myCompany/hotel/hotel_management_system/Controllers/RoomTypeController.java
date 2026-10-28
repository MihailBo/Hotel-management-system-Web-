package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Models.RoomType;
import com.myCompany.hotel.hotel_management_system.Services.RoomTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roomType")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class RoomTypeController {


    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {

        this.roomTypeService = roomTypeService;
    }


    @GetMapping
    public ResponseEntity<List<RoomType>> GetAll(){

        return ResponseEntity.ok(roomTypeService.getAllRoomTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> GetById(@PathVariable("id") Long id){
        return ResponseEntity.ok(roomTypeService.getById(id));
    }

    @PostMapping
    public ResponseEntity<?> Post(@RequestBody RoomType roomType){

        return ResponseEntity.status(HttpStatus.CREATED).body(roomTypeService.addRoomType(roomType));
    }

    @PutMapping
    public ResponseEntity<?> Put(@PathVariable("id") Long id, @RequestBody RoomType newRoomType){
        return ResponseEntity.ok(roomTypeService.updateRoomType(id,newRoomType));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> Delete(@PathVariable("id") Long id){

        roomTypeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
