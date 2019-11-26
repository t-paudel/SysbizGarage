package com.sysbizGarage.leaveManagement.repository;

import com.sysbizGarage.leaveManagement.dto.UserLeaveData;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveRepository extends MongoRepository<UserLeaveData, String> 
{
    UserLeaveData findByEmployeeId(String employeeId);
}