package com.erp.MentEdge.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.erp.MentEdge.dto.UserWalletResponse;
import com.erp.MentEdge.entity.UserTransactionHistory;

public interface UserTransactionHistoryRepository
        extends JpaRepository<UserTransactionHistory, Long> {

	List<UserTransactionHistory> findByUserId(Long userId);
	 List<UserTransactionHistory> findByMentorId(Long mentorId);

	    @Query("SELECT COALESCE(SUM(u.amount), 0) FROM UserTransactionHistory u WHERE u.mentorId = :mentorId")
	    Double getTotalBalanceByMentorId(Long mentorId);

}
