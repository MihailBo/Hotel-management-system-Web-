package com.myCompany.hotel.hotel_management_system.Controllers;

import com.myCompany.hotel.hotel_management_system.Models.Customer;
import com.myCompany.hotel.hotel_management_system.Repositoris.Customer_Rep;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:63342")
public class Customer_Controller {

    private Customer_Rep repo;

    public Customer_Controller(Customer_Rep repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Customer> GetAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Customer GetById(@PathVariable("id") Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
    }

    @PostMapping
    public Customer Post(@RequestBody Customer customer) {
        return repo.save(customer);
    }

    @PutMapping("/{id}")
    public Customer Put(@PathVariable("id") Long id, @RequestBody Customer updatedCustomer) {
        Customer customer = repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found."));
        customer.setEmail(updatedCustomer.getEmail());
        customer.setFirst_name(updatedCustomer.getFirst_name());
        customer.setLast_name(updatedCustomer.getLast_name());
        customer.setPhoneNum(updatedCustomer.getPhoneNum());
        customer.setIdCard_id(updatedCustomer.getIdCard_id());
        customer.setPassword(updatedCustomer.getPassword());

        return repo.save(customer);
    }

    @DeleteMapping("/{id}")
    void DeleteById(@PathVariable("id") Long id) {
        repo.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        repo.deleteById(id);
    }
}
