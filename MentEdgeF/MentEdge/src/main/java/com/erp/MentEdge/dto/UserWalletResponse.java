package com.erp.MentEdge.dto;

public class UserWalletResponse {

    private String name;
    private String type;
    private String duration;
    private Double amount;
    private Long mentorId;
    private Long internshipId;

    // constructor
    public UserWalletResponse(String name, String type, String duration,
                              Double amount, Long mentorId) {
        this.name = name;
        this.type = type;
        this.duration = duration;
        this.amount = amount;
        this.mentorId = mentorId;
       
    }

	public UserWalletResponse(String name2, String type2, String duration2, Double amount2, Long mentorId2,
			Object internshipId2) {
		// TODO Auto-generated constructor stub
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

	public Long getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
	}

    // getters 
}
