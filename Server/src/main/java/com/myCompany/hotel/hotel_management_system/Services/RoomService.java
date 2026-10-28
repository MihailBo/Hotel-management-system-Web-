package com.myCompany.hotel.hotel_management_system.Services;

import com.myCompany.hotel.hotel_management_system.Exceptions.ResourceNotFoundException;
import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import com.myCompany.hotel.hotel_management_system.Models.Room;
import com.myCompany.hotel.hotel_management_system.Repositoris.ReservationRepository;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    private final ReservationRepository reservationRepository;

    public RoomService(RoomRepository roomRepository, ReservationRepository reservationRepository) {
        this.roomRepository = roomRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<Room> GetAllRooms(){

        return roomRepository.findAll();
    }

    public Room GetById(Long id){
        return
                roomRepository.
                        findById(id).
                             orElseThrow(()->
                                new ResourceNotFoundException("Room with id: " + id + " not found!"));
    }

    public Room AddRoom(Room room){

        return roomRepository.save(room);
    }

    public Room Put(Long id, Room editedRoom){
        Room room = roomRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Room with id: " + id + " not found!"));
        room.setRoomNum(editedRoom.getRoomNum());
        room.setPricePerNight(editedRoom.getPricePerNight());
        return roomRepository.save(room);
    }

    public void Delete(Long id){
        roomRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Room with id: " + id + " not found!"));
        roomRepository.deleteById(id);
    }

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
                roomRepository.findByRoomType_Id(roomTypeId);


        // Всички резервации, които се застъпват
        List<Reservation> reservations =
                reservationRepository
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
                                        reservation.getRoom().getId()
                                )
                        )
                )
                .count();


        int totalRooms = rooms.size();

        long availableRooms =
                totalRooms - occupiedRooms;


        // TODO: dto
        Map<String, Object> response = new HashMap<>();

        response.put("roomTypeId", roomTypeId);
        response.put("checkIn", checkIn);
        response.put("checkOut", checkOut);
        response.put("totalRooms", totalRooms);
        response.put("occupiedRooms", occupiedRooms);
        response.put("availableRooms", availableRooms);

        var TEST_AvailableRoom = getAvailableRoomsByTypeId(checkInDateTime, checkOutDateTime,roomTypeId);
        response.put("TEST_AvailableRoom", TEST_AvailableRoom);

        return response;
    }

    public List<Room> getAvailableRoomsByTypeId(LocalDateTime checkIn, LocalDateTime checkOut, Long roomTypeId){


        // Всички стаи от избрания тип
        List<Room> rooms =
                roomRepository.findByRoomType_Id(roomTypeId);


        // Всички резервации, които се застъпват
        List<Reservation> reservations =
                reservationRepository
                        .findOverlappingReservations(
                                checkOut,
                                checkIn
                        );

        List<Long> occupiedRoomIds = reservations.stream().map(r -> r.getRoom().getId()).toList();

        List<Room> freeRooms = rooms.stream().filter(r -> !occupiedRoomIds.contains(r.getId())).toList();

        return  freeRooms;
    }
}

