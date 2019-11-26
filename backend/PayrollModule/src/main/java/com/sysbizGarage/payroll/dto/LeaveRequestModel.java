package com.sysbizGarage.payroll.dto;

import java.util.List;

public class LeaveRequestModel 
{
	private List<LeaveRequest> leaveRequest;
	private String employeeId;
	
	
	public List<LeaveRequest> getLeaveRequest() {
		return leaveRequest;
	}
	public void setLeaveRequest(List<LeaveRequest> leaveRequest) {
		this.leaveRequest = leaveRequest;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	
	
}
