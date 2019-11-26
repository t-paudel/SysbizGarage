package com.sysbizGarage.leaveManagement.repository;

import java.util.Date;
import java.util.List;

import com.sysbizGarage.leaveManagement.dto.LeaveHistory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends MongoRepository<LeaveHistory, String>
{
	List<LeaveHistory> findByEmployeeIdAndUtilityType(String employeeId, String utilityType);

	List<LeaveHistory> findByEmployeeIdAndDisplayStatus(String employeeId, Boolean displayStatus);

	List<LeaveHistory> findByDisplayStatus(Boolean displayStatus);

	List<LeaveHistory> findByEmployeeIdAndApproveStatus(String employeeId, String approveStatus);

	LeaveHistory findByEmployeeIdAndStartDateAndEndDate(String employeeId, Date startDate, Date endDate);
}
