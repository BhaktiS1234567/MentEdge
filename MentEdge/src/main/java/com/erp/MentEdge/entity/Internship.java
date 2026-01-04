package com.erp.MentEdge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "internship")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;   // Online / Offline / Hybrid

    private String duration; // e.g. 3 Months

    private Double amount;

    @Column(name = "mentor_id")
    private Long mentorId;
     
    // Constructors
    public Internship() {}

    public Internship(String name, String type, String duration, Double amount, Long mentorId ) {
        this.name = name;
        this.type = type;
        this.duration = duration;
        this.amount = amount;
        this.mentorId = mentorId;
     
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

	
}
