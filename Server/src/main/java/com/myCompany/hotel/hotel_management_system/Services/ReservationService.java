package com.myCompany.hotel.hotel_management_system.Services;


import com.myCompany.hotel.hotel_management_system.DTO.reservation.ReservationCreateRequest;
import com.myCompany.hotel.hotel_management_system.Models.Reservation;
import com.myCompany.hotel.hotel_management_system.Models.Room;
import com.myCompany.hotel.hotel_management_system.Models.User;
import com.myCompany.hotel.hotel_management_system.Repositoris.ReservationRepository;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomRepository;
import com.myCompany.hotel.hotel_management_system.Repositoris.RoomTypeRepository;
import com.myCompany.hotel.hotel_management_system.Repositoris.UserRepository;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.lang.module.ResolutionException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final RoomService roomService;

    public ReservationService(
            ReservationRepository reservationRepository,
            RoomRepository roomRepository,
            UserRepository userRepository, RoomTypeRepository roomTypeRepository, RoomService roomService
    ){
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;

        this.roomTypeRepository = roomTypeRepository;
        this.roomService = roomService;
    }

    public List<Reservation> GetAll(){

        return reservationRepository.findAll();
    }

    public Reservation GetById(Long id){
        return reservationRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found."));
    }

    public Reservation Post(UserDetails userDetails, ReservationCreateRequest reservationCreateRequest){

        User user = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(()-> new IllegalArgumentException("User not found!"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setCheck_in(reservationCreateRequest.getCheck_in());
        reservation.setCheck_out(reservationCreateRequest.getCheck_out());
        reservation.setEmail(reservationCreateRequest.getEmail());
        reservation.setPhoneNum(reservationCreateRequest.getPhoneNum());
        reservation.setFirstName(reservationCreateRequest.getFirstName());
        reservation.setLastName(reservationCreateRequest.getLastName());

        Long roomId = reservationCreateRequest.getRoomId();




        List<Room> rooms = roomService.getAvailableRoomsByTypeId(
                reservationCreateRequest.getCheck_in(),
                reservationCreateRequest.getCheck_out(),
                roomId
        );

        if(rooms.isEmpty()){
            throw new RuntimeException("There are not available rooms");
        }

        Room room = rooms.getFirst();

        double totalPrice = calculatePrice(
                reservationCreateRequest.getCheck_in(),
                reservationCreateRequest.getCheck_out(),
                room.getPricePerNight()
        );

        reservation.setRoom(room);
        reservation.setTotalPrice(totalPrice);



        return reservationRepository.save(reservation);
    }

    // TODO: dto
    public Reservation Put(
            @PathVariable("id") Long id,
            @RequestBody Reservation newReservation,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id not found"));

        reservation.setCheck_in(newReservation.getCheck_in());
        reservation.setCheck_out(newReservation.getCheck_out());

        Room room = roomRepository.findById(newReservation.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room is not found!"));

        reservation.setRoom(room);
        reservation.setUser(user);

        long days = ChronoUnit.DAYS.between(
                newReservation.getCheck_in(),
                newReservation.getCheck_out()
        );
        double totalPrice = calculatePrice(
                newReservation.getCheck_in(),
                newReservation.getCheck_out(),
                room.getPricePerNight()
        );
        reservation.setTotalPrice(totalPrice);
        reservation.setCreated_at(newReservation.getCreated_at());
        return reservationRepository.save(reservation);
    }

    public void Delete(@PathVariable("id") Long id){
        reservationRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        reservationRepository.deleteById(id);
    }

    private double calculatePrice(LocalDateTime checkIn, LocalDateTime checkOut, double pricePerNight){

        long days = ChronoUnit.DAYS.between(
                checkIn,
                checkOut
        );
        return days * pricePerNight;
    }
}
