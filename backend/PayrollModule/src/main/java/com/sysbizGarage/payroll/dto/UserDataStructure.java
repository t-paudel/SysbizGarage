package com.sysbizGarage.payroll.dto;

import org.springframework.stereotype.Component;

@Component
public class UserDataStructure 
{
	private String leaveType;
	private int noOfLeaves;
	
	public String getLeaveType() 
	{
		return leaveType;
	}

	public void setLeaveType(String leaveType) 
	{
		this.leaveType = leaveType;
	}

	public int getNoOfLeaves() 
	{
		return noOfLeaves;
	}

	public void setNoOfLeaves(int noOfLeaves) 
	{
		this.noOfLeaves = noOfLeaves;
	}

	@Override
	public String toString() {
		return "UserDataStructure [leaveType=" + leaveType + ", noOfLeaves=" + noOfLeaves + "]";
	}
	
}
