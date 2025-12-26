package com.erp.MentEdge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_transaction_history")
public class UserTransactionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id", nullable = false, unique = true)
    private String transactionId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "mentor_id", nullable = false)
    private Long mentorId;

    @Column(name = "name")
    private String name;

    @Column(name = "internship_id", nullable = false)
    private Long internshipId;   // From Internship table

    @Column(name = "type")
    private String type;   // credit / debit / internship / refund

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "transaction_date")
    private LocalDateTime date;

    @Column(name = "status")
    private String status;  // SUCCESS / FAILED / PENDING

    // Constructors
    public UserTransactionHistory() {}

    public UserTransactionHistory(String transactionId, Long userId, Long mentorId,
                                  String name, Long internshipId, String type,
                                  Double amount, LocalDateTime date, String status) {
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

    // Getters & Setters (generate via IDE)
}
