package com.erp.MentEdge.dto;

import java.time.LocalDateTime;

public class UserTransactionResponseDTO {

    private Long id;
    private String transactionId;
    private Long userId;
    private Long mentorId;
    private String name;
    private Long internshipId;
    private String type;
    private Double amount;
    private LocalDateTime date;
    private String status;

    public UserTransactionResponseDTO(Long id, String transactionId, Long userId,
                                      Long mentorId, String name, Long internshipId,
                                      String type, Double amount,
                                      LocalDateTime date, String status) {
        this.id = id;
        this.transactionId = transactionId;
        this.userId = userId;
        this.mentorId = mentorId;
        this.name = name;
        this.internshipId = internshipId;
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.status = status;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
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

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    // getters
}