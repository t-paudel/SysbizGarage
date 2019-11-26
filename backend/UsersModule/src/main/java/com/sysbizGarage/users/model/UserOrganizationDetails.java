package com.sysbizGarage.users.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="USER_ORGANIZATION_DETAILS")
public class UserOrganizationDetails 
{
	@Id
	private String _id;
	
	private String userId;
	private String roleName;
	private String firstName;
	private String middleName;
	private String lastName;
	private String organizationEmailId;
	private Date doj;
	private Date doe;
	private Boolean displayStatus;
	
	public String get_id() {
		return _id;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getOrganizationEmailId() {
		return organizationEmailId;
	}
	public void setOrganizationEmailId(String organizationEmailId) {
		this.organizationEmailId = organizationEmailId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}

	public Date getDoe() {
		return doe;
	}

	public void setDoe(Date doe) {
		this.doe = doe;
	}

	public Boolean getDisplayStatus() {
		return displayStatus;
	}

	public void setDisplayStatus(Boolean displayStatus) {
		this.displayStatus = displayStatus;
	}
	
	@Override
	public String toString() {
		return "UserOrganizationDetails [_id=" + _id + ", userId=" + userId + ", roleId=" + roleName + ", firstName="
				+ firstName + ", middleName=" + middleName + ", lastName=" + lastName + ", organizationEmailId="
				+ organizationEmailId + ", doj=" + doj + ", doe=" + doe + ", displayStatus=" + displayStatus + "]";
	}
	
}
