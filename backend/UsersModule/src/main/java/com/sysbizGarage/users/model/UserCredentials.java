package com.sysbizGarage.users.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="USER_CREDENTIALS")
public class UserCredentials 
{
	@Id
	private String _id;
	
	private String userId;
	private String password;
	
	public String get_id() {
		return _id;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
