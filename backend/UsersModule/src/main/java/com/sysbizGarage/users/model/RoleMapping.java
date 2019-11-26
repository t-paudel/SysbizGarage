package com.sysbizGarage.users.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="ROLE_MAPPING")
public class RoleMapping 
{
	@Id
	private String _id;
	
	private int roleId;
	private String roleName;
	
	public String get_id() {
		return _id;
	}
	
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Override
	public String toString() {
		return "RoleMapping [_id=" + _id + ", roleId=" + roleId + ", roleName=" + roleName + "]";
	}	
	
	
}
