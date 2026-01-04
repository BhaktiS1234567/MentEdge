package com.erp.MentEdge.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.MentEdge.dto.UserTransactionRequestDTO;
import com.erp.MentEdge.dto.UserTransactionResponseDTO;
import com.erp.MentEdge.dto.UserWalletResponse;
import com.erp.MentEdge.entity.Internship;
import com.erp.MentEdge.entity.UserTransactionHistory;
import com.erp.MentEdge.repository.InternshipRepo;
import com.erp.MentEdge.repository.UserTransactionHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/userwallet")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private InternshipRepo internshipRepository;

    @Autowired
    private UserTransactionHistoryRepository repository;

    @GetMapping("/{internshipId}")
    public UserWalletResponse getUserWalletDetailsByInternshipId(
            @PathVariable Long internshipId) {

        Internship i = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        return new UserWalletResponse(
                i.getName(),
                i.getType(),
                i.getDuration(),
                i.getAmount(),
                i.getMentorId()
        );
    }

    @PostMapping("/transactions")
    public UserTransactionResponseDTO createTransaction(
            @RequestBody UserTransactionRequestDTO dto) {

        UserTransactionHistory transaction = new UserTransactionHistory();

        transaction.setTransactionId(dto.getTransactionId());
        transaction.setUserId(dto.getUserId());
        transaction.setMentorId(dto.getMentorId());
        transaction.setName(dto.getName());
        transaction.setInternshipId(dto.getInternshipId());
        transaction.setType(dto.getType());
        transaction.setAmount(dto.getAmount());
        transaction.setDate(
                dto.getDate() != null ? dto.getDate() : LocalDateTime.now()
        );
        transaction.setStatus(dto.getStatus());

        UserTransactionHistory saved = repository.save(transaction);

        return new UserTransactionResponseDTO(
                saved.getId(),
                saved.getTransactionId(),
                saved.getUserId(),
                saved.getMentorId(),
                saved.getName(),
                saved.getInternshipId(),
                saved.getType(),
                saved.getAmount(),
                saved.getDate(),
                saved.getStatus()
        );
    }

    @GetMapping("/transactions/{userId}")
    public List<UserTransactionResponseDTO> getTransactionsByUserId(
            @PathVariable Long userId) {

        return repository.findByUserId(userId)
                .stream()
                .map(t -> new UserTransactionResponseDTO(
                        t.getId(),
                        t.getTransactionId(),
                        t.getUserId(),
                        t.getMentorId(),
                        t.getName(),
                        t.getInternshipId(),
                        t.getType(),
                        t.getAmount(),
                        t.getDate(),
                        t.getStatus()
                ))
                .toList();
    }
}
