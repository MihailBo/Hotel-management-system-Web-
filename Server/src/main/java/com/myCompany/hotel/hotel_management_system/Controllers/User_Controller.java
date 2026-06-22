package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Models.User;
import com.myCompany.hotel.hotel_management_system.Repositoris.User_Rep;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class User_Controller {

    private User_Rep repo;

    User_Controller(User_Rep repo){
        this.repo = repo;
    }

    @GetMapping
    List<User> GetAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    User GetById(@PathVariable("id") Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found."));
    }


    @PostMapping
    User Post(@RequestBody User user){
        return repo.save(user);
    }

    @PutMapping("/{id}")
    User Put(@PathVariable("id") Long id, @RequestBody User updatedUser){
        User user = repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        user.setUserName(updatedUser.getUserName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        return repo.save(user);
    }

    @DeleteMapping("/{id}")
    void Delete(@PathVariable("id") Long id){
        repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        repo.deleteById(id);
    }

}
