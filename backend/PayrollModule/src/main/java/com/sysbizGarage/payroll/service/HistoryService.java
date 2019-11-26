package com.sysbizGarage.payroll.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.sysbizGarage.payroll.dto.LeaveHistory;
import com.sysbizGarage.payroll.dto.LeaveRequest;
import com.sysbizGarage.payroll.dto.LeaveRequestModel;
import com.sysbizGarage.payroll.repository.HistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryService 
{
    @Autowired
    private HistoryRepository historyRepo;
    

    public List<LeaveHistory> getLeaveHistory(String employeeId)
	{
		System.out.println("HistoryService : getLeaveHistory()");

		List<LeaveHistory> history = new ArrayList<>();
		historyRepo.findAll().forEach(history::add);
		
		return history;
	}
	
	public void updateLeaveHistory(LeaveRequestModel req)
	{
		System.out.println("HistoryService : updateLeaveHistory()");

		LeaveHistory history;
		LeaveRequest leaveData;
		Iterator<LeaveRequest> itr = req.getLeaveRequest().iterator();
		
		while(itr.hasNext())
		{
			leaveData = itr.next();
			history = new LeaveHistory();

			history.setEmployeeId(req.getEmployeeId());
			history.setStartDate(leaveData.getStartDate());	
			history.setEndDate(leaveData.getEndDate());
			history.setReason(leaveData.getReason());
			history.setUtilityType("Applied for Leave");
			history.setDisplayStatus(true);
			history.setLeaveType(leaveData.getLeaveType());
			history.setApproveStatus("pending");
			
			historyRepo.save(history);
		}		
    }
}