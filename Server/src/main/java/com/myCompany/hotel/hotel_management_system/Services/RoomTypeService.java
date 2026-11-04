package com.myCompany.hotel.hotel_management_system.Services;

import com.myCompany.hotel.hotel_management_system.Models.RoomType;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<RoomType> getAllRoomTypes(){
        return roomTypeRepository.findAll();
    }

    public RoomType getById(Long id){
        return roomTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Room type not found!"));
    }

    public RoomType addRoomType(RoomType roomType){
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(Long id, RoomType newRoomType){
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        roomType.setDescription(newRoomType.getDescription());
        roomType.setName(newRoomType.getName());
        roomType.setImageUrl(newRoomType.getImageUrl());
        return roomTypeRepository.save(roomType);
    }

    public void deleteById(Long id) {
        roomTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        roomTypeRepository.deleteById(id);
    }
}
