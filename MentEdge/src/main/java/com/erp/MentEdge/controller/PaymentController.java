package com.erp.MentEdge.controller;




import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.erp.MentEdge.service.RazorpayService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount , @RequestParam String currency){

        try {
            return razorpayService.createOrder(amount, currency, "recepient_100");
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }
}
