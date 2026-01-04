package com.erp.MentEdge.dto;

import java.time.LocalDateTime;

public class MentorTransactionDTO {

    private String transactionId;
    private String name;
    private String type;
    private Double amount;
    private String status;
    private LocalDateTime date;

    public MentorTransactionDTO(String transactionId, String name, String type,
                                Double amount, String status, LocalDateTime date) {
        this.transactionId = transactionId;
        this.name = name;
        this.type = type;
        this.amount = amount;
        this.status = status;
        this.date = date;
    }

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

    // getters
}
