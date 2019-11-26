package com.sysbizGarage.payroll.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sysbizGarage.payroll.dto.UserLeaveData;

@Repository
public interface LeaveRepository extends MongoRepository<UserLeaveData, String> 
{
    UserLeaveData findByEmployeeId(String employeeId);
}