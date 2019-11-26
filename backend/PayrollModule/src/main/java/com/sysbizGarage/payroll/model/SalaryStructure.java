package com.sysbizGarage.payroll.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="SalaryStructure")
public class SalaryStructure 
{
	@Id
	private String _id;
	
	
	private String userId;
	private int basic;
	private int hra;
	private int cityCompensatoryAllowance;
	private int conveyanceAllowance;
	private int medicalAllowance;
	private int leaveTravelAllowance;
	private int specialAllowance;
	private int performaceLinkedAllowance;	

}
