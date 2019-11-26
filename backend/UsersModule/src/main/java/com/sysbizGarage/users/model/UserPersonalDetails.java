package com.sysbizGarage.users.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="USER_PERSONAL_DETAILS")
public class UserPersonalDetails 
{
	@Id
	private String _id;
	
	private String firstName;
	private String middleName;
	private String lastName;
	private String fatherName;
	private String motherName;
	private String permanentAddress;
	private String permanentAddressPincode;
	private String currentAddress;
	private String currentAddressPincode;
	private String contactNumber1;
	private String contactNumber2;
	private String emergencyContactNumber1;
	private String emergencyContactNumber2;
	private String personalEmailId;
	private Date dob;
	private String displayStatus;
	
	
	public String get_id() {
		return _id;
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
	public String getFatherName() {
		return fatherName;
	}
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	public String getMotherName() {
		return motherName;
	}
	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}
	public String getPermanentAddress() {
		return permanentAddress;
	}
	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}
	public String getCurrentAddress() {
		return currentAddress;
	}
	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}
	
	public String getContactNumber1() {
		return contactNumber1;
	}
	public void setContactNumber1(String contactNumber1) {
		this.contactNumber1 = contactNumber1;
	}
	public String getContactNumber2() {
		return contactNumber2;
	}
	public void setContactNumber2(String contactNumber2) {
		this.contactNumber2 = contactNumber2;
	}
	public String getEmergencyContactNumber1() {
		return emergencyContactNumber1;
	}
	public void setEmergencyContactNumber1(String emergencyContactNumber1) {
		this.emergencyContactNumber1 = emergencyContactNumber1;
	}
	public String getEmergencyContactNumber2() {
		return emergencyContactNumber2;
	}
	public void setEmergencyContactNumber2(String emergencyContactNumber2) {
		this.emergencyContactNumber2 = emergencyContactNumber2;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	
	public String getPersonalEmailId() {
		return personalEmailId;
	}
	public void setPersonalEmailId(String personalEmailId) {
		this.personalEmailId = personalEmailId;
	}
	public String getPermanentAddressPincode() {
		return permanentAddressPincode;
	}
	public void setPermanentAddressPincode(String permanentAddressPincode) {
		this.permanentAddressPincode = permanentAddressPincode;
	}
	public String getCurrentAddressPincode() {
		return currentAddressPincode;
	}
	public void setCurrentAddressPincode(String currentAddressPincode) {
		this.currentAddressPincode = currentAddressPincode;
	}

	public String getDisplayStatus() {
		return displayStatus;
	}

	public void setDisplayStatus(String displayStatus) {
		this.displayStatus = displayStatus;
	}

	@Override
	public String toString() {
		return "UserPersonalDetails [_id=" + _id + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", fatherName=" + fatherName + ", motherName=" + motherName
				+ ", permanentAddress=" + permanentAddress + ", permanentAddressPincode=" + permanentAddressPincode
				+ ", currentAddress=" + currentAddress + ", currentAddressPincode=" + currentAddressPincode
				+ ", contactNumber1=" + contactNumber1 + ", contactNumber2=" + contactNumber2
				+ ", emergencyContactNumber1=" + emergencyContactNumber1 + ", emergencyContactNumber2="
				+ emergencyContactNumber2 + ", personalEmailId=" + personalEmailId + ", dob=" + dob + ", displayStatus="
				+ displayStatus + "]";
	}
	
	
}
