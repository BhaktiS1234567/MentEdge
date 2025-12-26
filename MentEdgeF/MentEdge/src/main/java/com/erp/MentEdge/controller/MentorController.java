package com.erp.MentEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.erp.MentEdge.dto.MentorTransactionDTO;
import com.erp.MentEdge.dto.MentorWalletResponseDTO;
import com.erp.MentEdge.entity.UserTransactionHistory;
import com.erp.MentEdge.repository.UserTransactionHistoryRepository;

@RestController
@RequestMapping("/mentor")
public class MentorController {

    @Autowired
    private UserTransactionHistoryRepository repository;

    @GetMapping("/wallet/{mentorId}")
    public MentorWalletResponseDTO getMentorWallet(@PathVariable Long mentorId) {

        // 1. Fetch transactions
        List<UserTransactionHistory> transactions =
                repository.findByMentorId(mentorId);

        // 2. Calculate total balance
        Double totalBalance =
                repository.getTotalBalanceByMentorId(mentorId);

        // 3. Map to DTO
        List<MentorTransactionDTO> transactionDTOs = transactions.stream()
                .map(t -> new MentorTransactionDTO(
                        t.getTransactionId(),
                        t.getName(),
                        t.getType(),
                        t.getAmount(),
                        t.getStatus(),
                        t.getDate()
                ))
                .toList();

        // 4. Final response
        return new MentorWalletResponseDTO(
                mentorId,
                totalBalance,
                transactionDTOs
        );
    }
}
