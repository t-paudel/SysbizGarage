package com.sysbizGarage.users.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="USER_MAPPING")
public class UserMapping 
{
	@Id
	private String _id;
	
	private String userId;
	private String teamLead;
	private String supervisor;
	private String manager;
	
	public String get_id() {
		return _id;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getteamLead() {
		return teamLead;
	}
	public void setteamLead(String teamLead) {
		this.teamLead = teamLead;
	}
	public String getsupervisor() {
		return supervisor;
	}
	public void setsupervisor(String supervisor) {
		this.supervisor = supervisor;
	}
	public String getmanager() {
		return manager;
	}
	public void setmanager(String manager) {
		this.manager = manager;
	}

	@Override
	public String toString() {
		return "UserMapping [_id=" + _id + ", userId=" + userId + ", teamLead=" + teamLead + ", supervisor="
				+ supervisor + ", manager=" + manager + "]";
	}
	
}
