package com.sysbizGarage.payroll.dto;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class CompOffDataModel 
{
	private List<CompOffDataFields> compOffData;
	private String employeeId;
	
	
	public List<CompOffDataFields> getCompOffData() {
		return compOffData;
	}
	public void setCompOffData(List<CompOffDataFields> compOffData) {
		this.compOffData = compOffData;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
}
