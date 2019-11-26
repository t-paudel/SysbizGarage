package com.sysbizGarage.payroll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.sysbizGarage.payroll.dto.CompOffDataModel;
import com.sysbizGarage.payroll.dto.LeaveHistory;
import com.sysbizGarage.payroll.dto.LeaveRequestModel;
import com.sysbizGarage.payroll.dto.UserDataStructure;
import com.sysbizGarage.payroll.dto.UserLeaveData;
import com.sysbizGarage.payroll.service.HistoryService;
import com.sysbizGarage.payroll.service.LeaveService;



/**
 * Created by achalise on 29/4/17.
 */
@RestController
@RequestMapping("/api/leaves")
public class LeaveController 
{
	
	@Autowired
	private HistoryService historyService;
	
	@Autowired
	private LeaveService leaveService;
    
	
	@PostMapping("/getLeaves")
	public List<UserDataStructure> getUserLeaveData(@RequestBody String employeeId)
	{
		System.out.println("LeaveController : getUserLeaveData()");
		
		List<UserDataStructure> userData = new ArrayList<>();
		userData = leaveService.getUserLeaveData(employeeId);
		return userData;
	}
	
	@PostMapping("/applyLeave")
	public void applyLeave(@RequestBody LeaveRequestModel req)
	{
		System.out.println("LeaveController : applyLeave()");

		leaveService.applyLeave(req);
		
		historyService.updateLeaveHistory(req);
	}
	
	@PostMapping("/getHistory")
	public List<LeaveHistory> getLeaveHistory(@RequestBody String employeeId)
	{
		System.out.println("LeaveController : getLeaveHistory()");
		
		List<LeaveHistory> history = new ArrayList<>();
		history = historyService.getLeaveHistory(employeeId);
		
		return history;
	}
	
	@PostMapping("/availCompOff")
	public void availCompOff(@RequestBody CompOffDataModel data)
	{
		System.out.println("LeaveController : availCompOff()");
		
		leaveService.availCompOff(data);
	}

	@PostMapping("/setLeavesForNewUser")
	public void setLeavesForNewUser(@RequestBody UserLeaveData data)
	{
		System.out.println("LeaveController : setLeavesForNewUser()");

		leaveService.saveUsersLeaveData(data);
	}

	@PostMapping("/getAppliedLeaves")
	public List<LeaveHistory> getAppliedLeaves(@RequestBody String employeeId)
	{
		System.out.println("LeaveController : getAppliedLeaves()");
		
		List<LeaveHistory> data = new ArrayList<>();
		data = leaveService.getAppliedLeaves(employeeId,"Applied for Leave");

		return data;
	}

	@PostMapping("/getPendingNotifications")
	public List<LeaveHistory> getNotifications(@RequestBody String supervisorId)
	{
		System.out.println("Controller:getNotifications()");

		List<LeaveHistory> leaveHistory = new ArrayList<>();
		leaveHistory =  leaveService.getNotifications(supervisorId);

		return leaveHistory;
	}

	@PostMapping("/approveRequest")
	public void approveRequest(@RequestBody LeaveHistory req)
	{
		System.out.println("Controller:approveRequest()");

		leaveService.approveRequest(req);
	}

	@PostMapping("/rejectRequest")
	public void rejectRequest(@RequestBody LeaveHistory req)
	{
		System.out.println("Controller:rejectRequest()");

		leaveService.rejectRequest(req);
	}
}