package com.sysbizGarage.leaveManagement.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class LeaveRequest 
{
	private String employeeId;
	private Date startDate;
	private Date endDate;
	private String leaveType;
	private String reason;
	private String status;
	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
	
	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	@Override
	public String toString() {
		return "LeaveRequest [employeeId=" + employeeId + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", leaveType=" + leaveType + ", reason=" + reason + ", status=" + status + "]";
	}
	
	
}
