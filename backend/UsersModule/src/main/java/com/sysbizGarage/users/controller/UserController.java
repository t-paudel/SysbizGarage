package com.sysbizGarage.users.controller;

import java.util.ArrayList;
import java.util.List;

import com.sysbizGarage.users.dto.ResponseMessage;
import com.sysbizGarage.users.model.RoleMapping;
import com.sysbizGarage.users.model.UserCredentials;
import com.sysbizGarage.users.model.UserMapping;
import com.sysbizGarage.users.model.UserOrganizationDetails;
import com.sysbizGarage.users.model.UserPersonalDetails;
import com.sysbizGarage.users.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/users")
public class UserController 
{
	@Autowired
	UserService service;
	
	
	@PostMapping("/saveUserPersonalDetails")
	public ResponseMessage saveUserPersonalDetails(@RequestBody UserPersonalDetails request)
	{
		System.out.println("UserModule -> Controller : getUserDetails()");
		
		System.out.println(request.toString());
		ResponseMessage response = new ResponseMessage();
		response = service.saveUserPersonalDetails(request);

		return response;
	}
	
	@PostMapping("/saveUserOrganizationDetails")
	public ResponseMessage saveUserOrganisationDetails(@RequestBody UserOrganizationDetails request)
	{
		System.out.println("UserModule -> Controller : getUserDetails()");
		
		System.out.println(request.toString());
		ResponseMessage response = new ResponseMessage();
		response = service.saveUserOrganizationalDetails(request);

		return response;
	}
	
	@PostMapping("/saveUserMappingDetails")
	public ResponseMessage saveUserMappinglDetails(@RequestBody UserMapping request)
	{
		System.out.println("UserModule -> Controller : getUserDetails()");
		
		System.out.println(request.toString());
		ResponseMessage response = new ResponseMessage();
		response = service.saveUserMapping(request);

		return response;
	}
	
	@PostMapping("/saveRoleMappingDetails")
	public ResponseMessage saveRoleMappingDetails(@RequestBody RoleMapping request)
	{
		System.out.println("UserModule -> Controller : getUserDetails()");
		
		ResponseMessage response = new ResponseMessage();
		System.out.println(request.toString());
		response = service.saveRoleMapping(request);

		return response;
	}
	
	@PostMapping("/saveUserCredentials")
	public ResponseMessage saveUserCredentials(@RequestBody UserCredentials request)
	{
		System.out.println("UserModule -> Controller : saveUserCredentials()");
		
		ResponseMessage response = new ResponseMessage();
		response = service.saveUserCredentials(request);

		return response;
	}

	@PostMapping("/login")
	public ResponseMessage loggedIn(@RequestBody UserCredentials request)
	{
		System.out.println("UserModule -> Controller : loggedIn()");
		
		ResponseMessage response = new ResponseMessage();
		response = service.loggedIn(request);
		
		return response;
    }
    
    @PostMapping("/changePassword")
    public void changePassword(@RequestBody UserCredentials request)
    {
		System.out.println("UserModule -> Controller : loggedIn()");
		
		service.changePassword(request);
	}
	
	@GetMapping("/getRoleNames")
	public List<String> getRoleNames()
	{
		System.out.println("UserModule -> Controller : getRoleNames()");

		List<String> roles = new ArrayList<>();
		roles = service.getRoleName();
		return roles;
	}

	@GetMapping("/getEmployeeType/{roleName}")
	public List<String> getEmployeeType(@PathVariable("roleName") String roleName)
	{
		System.out.println("UserModule -> Controller : getEmployeeType()");

		List<String> employees = new ArrayList<>();
		System.out.println("Rolename = " + roleName);
		employees = service.getEmployeeType(roleName);
		System.out.println("roleName size = " + employees.size());

		return employees;
	}

	@GetMapping("/getUnmappedUsers")
	public List<String> getUnmappedusers()
	{
		System.out.println("UserModule -> Controller : getEmployeeType()");

		List<String> employees = new ArrayList<>();
		employees = service.getUnmappedUsers();
		
		return employees;
	}
	
}


