package com.erp.MentEdge.dto;

import java.util.List;

public class MentorWalletResponseDTO {

    private Long mentorId;
    private Double totalBalance;
    private List<MentorTransactionDTO> transactions;

    public MentorWalletResponseDTO(Long mentorId, Double totalBalance,
                                   List<MentorTransactionDTO> transactions) {
        this.mentorId = mentorId;
        this.totalBalance = totalBalance;
        this.transactions = transactions;
    }

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public Double getTotalBalance() {
		return totalBalance;
	}

	public void setTotalBalance(Double totalBalance) {
		this.totalBalance = totalBalance;
	}

	public List<MentorTransactionDTO> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<MentorTransactionDTO> transactions) {
		this.transactions = transactions;
	}
    

    // getters
}
