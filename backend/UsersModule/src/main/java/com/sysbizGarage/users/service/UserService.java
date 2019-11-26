package com.sysbizGarage.users.service;

import java.util.ArrayList;
import java.util.List;

import com.sysbizGarage.users.dto.ResponseMessage;
import com.sysbizGarage.users.model.RoleMapping;
import com.sysbizGarage.users.model.UserCredentials;
import com.sysbizGarage.users.model.UserMapping;
import com.sysbizGarage.users.model.UserOrganizationDetails;
import com.sysbizGarage.users.model.UserPersonalDetails;
import com.sysbizGarage.users.repository.RoleMappingRepository;
import com.sysbizGarage.users.repository.UserCredentialRepository;
import com.sysbizGarage.users.repository.UserMappingRepository;
import com.sysbizGarage.users.repository.UserOrganizationDetailsRepository;
import com.sysbizGarage.users.repository.UserPersonalDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService 
{
	@Autowired
	private UserPersonalDetailsRepository personalRepo;
	
	@Autowired
	private UserOrganizationDetailsRepository organizationalRepo;
	
	@Autowired
	private UserMappingRepository userMappingRepo;
	
	@Autowired
	private RoleMappingRepository roleMappingRepo;
	
	@Autowired
	private UserCredentialRepository credentialRepo;
	
	
	
	public ResponseMessage saveUserPersonalDetails(UserPersonalDetails data)
	{
		System.out.println("UserModule -> Service : saveUserPersonalDetails()");
		
		ResponseMessage response = new ResponseMessage();
		personalRepo.save(data);

		return response;
	}
	
	public ResponseMessage saveUserOrganizationalDetails(UserOrganizationDetails data)
	{
		System.out.println("UserModule -> Service : saveUserPersonalDetails()");

		UserOrganizationDetails existingData = new UserOrganizationDetails();
		ResponseMessage response = new ResponseMessage();
		
		existingData = organizationalRepo.findByUserIdIgnoreCase(data.getUserId());
		try
		{
			existingData.getUserId();
			response.setStatus(false);
			response.setMessage("This user id already exist");
		}
		catch(NullPointerException e)
		{
			response.setStatus(true);
			response.setMessage("User Data Saved");
		}

		if(response.getStatus())
		{
			organizationalRepo.save(data);
		}

		System.out.println(response.getStatus() + "		" + response.getMessage());

		return response;
	}
	
	public ResponseMessage saveUserMapping(UserMapping data)
	{
		System.out.println("UserModule -> Service : saveUserMapping()");
		
		ResponseMessage response = new ResponseMessage();
		userMappingRepo.save(data);

		return response;
	}
	
	public ResponseMessage saveRoleMapping(RoleMapping data)
	{
		System.out.println("UserModule -> Service : saveRoleMapping()");
		
		RoleMapping existingData = new RoleMapping();
		ResponseMessage response = new ResponseMessage();

		existingData = roleMappingRepo.findByRoleNameIgnoreCase(data.getRoleName());
		
		try
		{
			existingData.getRoleName();
			response.setStatus(false);
			response.setMessage("This Role Name already exist");
		}
		catch(NullPointerException e)
		{
			response.setStatus(true);
			response.setMessage("User Data Saved");
		}

		existingData = roleMappingRepo.findByRoleId(data.getRoleId());
		try
		{
			existingData.getRoleId();
			response.setStatus(false);
			response.setMessage("This Role Id already exist");
		}
		catch(NullPointerException e)
		{
			response.setStatus(true);
			response.setMessage("User Data Saved");
		}
		
		if(response.getStatus())
			roleMappingRepo.save(data);
		
		return response;
	}
	
	public ResponseMessage saveUserCredentials(UserCredentials data)
	{
		System.out.println("UserModule -> Service : saveUserCredentials()");
		
		ResponseMessage response = new ResponseMessage();

		credentialRepo.save(data);

		return response;
	}

	public ResponseMessage loggedIn(UserCredentials data)
	{
		System.out.println("UserModule -> Service : loggedIn()");
		
		ResponseMessage response = new ResponseMessage();
		UserCredentials user = new UserCredentials();
		
		user = credentialRepo.findByUserIdAndPassword(data.getUserId(), data.getPassword());
		try 
		{
			user.getUserId();
			response.setStatus(true);
			response.setMessage("Logged in");		
		}
		catch(NullPointerException e)
		{		
			response.setStatus(false);
			response.setMessage("User Password Incorrect");
		}
		
		System.out.println(response.getStatus() + "     " + response.getMessage());
		
		return response;
	}

	public ResponseMessage changePassword(UserCredentials data)
	{
		System.out.println("UserModule -> Service : changePassword()");

		ResponseMessage response = new ResponseMessage();

		return response;
	}

	public List<String> getRoleName()
	{
		System.out.println("UserModule -> Service : getRoleName()");

		List<RoleMapping> temp = new ArrayList<>();
		List<String>roles = new ArrayList<>();
		
		temp = roleMappingRepo.findAll();

		for(RoleMapping role: temp)
			roles.add(role.getRoleName());

		return roles;
	}

	public List<String> getEmployeeType(String roleName)
	{
		System.out.println("UserModule -> Service : getEmployeeType()");

		List<UserOrganizationDetails> temp = new ArrayList<>();
		List<String> employeeList = new ArrayList<>();

		temp = organizationalRepo.findByRoleNameIgnoreCase(roleName);
		for(UserOrganizationDetails role : temp)
			employeeList.add(role.getFirstName() + " " + role.getLastName());

		return employeeList;
	}

	public List<String> getUnmappedUsers()
	{
		System.out.println("UserModule -> Service : getUnmappedUsers()");

		List<String> allUsers = new ArrayList<>();
		List<String> mappedUsers = new ArrayList<>();

		List<UserOrganizationDetails> temp1 = new ArrayList<>();
		List<UserMapping> temp2 = new ArrayList<>();

		temp1 = organizationalRepo.findAll();
		temp2 = userMappingRepo.findAll();

		for(UserOrganizationDetails user : temp1)
			allUsers.add(user.getUserId());

		for(UserMapping user : temp2)
			mappedUsers.add(user.getUserId());

		allUsers.removeAll(mappedUsers);
		return allUsers;
	}
}
