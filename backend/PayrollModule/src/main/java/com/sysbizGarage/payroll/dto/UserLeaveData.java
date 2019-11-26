package com.sysbizGarage.payroll.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "USER_DATA") 
public class UserLeaveData 
{
	@Id
	private String id;
	
	private String employeeId;
	private int casualLeave;
	private int sickLeave;
	private int earnedLeave;
	private int compOff;
	private int lop;
	private int maternityLeave;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public int getCasualLeave() {
		return casualLeave;
	}

	public void setCasualLeave(int casualLeave) {
		this.casualLeave = casualLeave;
	}

	public int getSickLeave() {
		return sickLeave;
	}

	public void setSickLeave(int sickLeave) {
		this.sickLeave = sickLeave;
	}

	public int getEarnedLeave() {
		return earnedLeave;
	}

	public void setEarnedLeave(int earnedLeave) {
		this.earnedLeave = earnedLeave;
	}

	public int getCompOff() {
		return compOff;
	}

	public void setCompOff(int compOff) {
		this.compOff = compOff;
	}

	public int getLop() {
		return lop;
	}

	public void setLop(int lop) {
		this.lop = lop;
	}

	public int getMaternityLeave() {
		return maternityLeave;
	}

	public void setMaternityLeave(int maternityLeave) {
		this.maternityLeave = maternityLeave;
	}

	@Override
	public String toString() {
		return "UserData [employeeId=" + employeeId + ", casualLeave=" + casualLeave + ", sickLeave=" + sickLeave
				+ ", earnedLeave=" + earnedLeave + ", compOff=" + compOff + ", lop=" + lop + ", maternityLeave="
				+ maternityLeave + "]";
	}
	
	
}
