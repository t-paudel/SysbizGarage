package com.sysbizGarage.payroll.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.sysbizGarage.payroll.dto.CompOffDataFields;
import com.sysbizGarage.payroll.dto.CompOffDataModel;
import com.sysbizGarage.payroll.dto.LeaveHistory;
import com.sysbizGarage.payroll.dto.LeaveRequest;
import com.sysbizGarage.payroll.dto.LeaveRequestModel;
import com.sysbizGarage.payroll.dto.UserDataStructure;
import com.sysbizGarage.payroll.dto.UserLeaveData;
import com.sysbizGarage.payroll.repository.HistoryRepository;
import com.sysbizGarage.payroll.repository.LeaveRepository;
import com.sysbizGarage.payroll.util.DateUtility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveService 
{
    @Autowired
    private LeaveRepository leaveRepo;

    @Autowired
	private HistoryRepository historyRepo;


	public List<UserLeaveData> getAllUsersLeaveData()
	{
		System.out.println("LeaveService : getAllUsersLeaveData()");

		List<UserLeaveData> userLeave = new ArrayList<>();
		userLeave = leaveRepo.findAll();

		return userLeave;
	}

	public void saveUsersLeaveData(UserLeaveData data)
	{
		System.out.println("LeaveService : saveUsersLeaveData()");

		leaveRepo.save(data);
	}
	
	public List<UserDataStructure> getUserLeaveData(String employeeId)
	{
		System.out.println("LeaveService : getUserLeaveData()");

		UserDataStructure data;
		UserLeaveData userData;
		List<UserDataStructure> dataList = new ArrayList<>();
		
		userData = leaveRepo.findByEmployeeId(employeeId);
		
		data = new UserDataStructure();
		data.setLeaveType("Sick Leave");
		data.setNoOfLeaves(userData.getSickLeave());
		dataList.add(data);
		
		data = new UserDataStructure();
		data.setLeaveType("Casual Leave");
		data.setNoOfLeaves(userData.getCasualLeave());
		dataList.add(data);
		
		data = new UserDataStructure();
		data.setLeaveType("Earned Leave");
		data.setNoOfLeaves(userData.getEarnedLeave());				
		dataList.add(data);
		
		data = new UserDataStructure();
		data.setLeaveType("Comp-Off");
		data.setNoOfLeaves(userData.getCompOff());
		dataList.add(data);
		
		data = new UserDataStructure();
		data.setLeaveType("LOP");
		data.setNoOfLeaves(userData.getLop());
		dataList.add(data);
		
		data = new UserDataStructure();
		data.setLeaveType("Maternity Leave");
		data.setNoOfLeaves(userData.getMaternityLeave());				
		dataList.add(data);
		
		return dataList;
	}
	
	public void applyLeave(LeaveRequestModel req) 
	{
		System.out.println("LeaveService : applyLeave()");
		
		DateUtility dateUtility = new DateUtility();
		int diff = 0;
		UserLeaveData data = leaveRepo.findByEmployeeId(req.getEmployeeId());
		LeaveRequest leaveData;
		Iterator<LeaveRequest> itr = req.getLeaveRequest().iterator();
		
		while(itr.hasNext())
		{
			leaveData = new LeaveRequest();
			leaveData = itr.next();
			
			diff = dateUtility.numberOfBusinessDays(leaveData.getStartDate(), leaveData.getEndDate());
			
			switch(leaveData.getLeaveType())
			{
				case "Sick Leave":
					System.out.println("Case : Sick Leave");
					data.setSickLeave(data.getSickLeave() - diff);
					break;
				
				case "Casual Leave":
					System.out.println("Case : Casual Leave");
					data.setCasualLeave(data.getCasualLeave() - diff);
					break;
					
				case "Earned Leave":
					System.out.println("Case : Earned Leave");
					data.setEarnedLeave(data.getEarnedLeave() - diff);
					break;
					
				case "Comp-Off":
					System.out.println("Case : Comp-off");
					data.setCompOff(data.getCompOff() - diff);
					break;
					
				case "LOP":
					System.out.println("Case : LOP");
					data.setLop(data.getLop() - diff);
					break;
					
				case "Maternity Leave":
					System.out.println("Case : Maternity Leave");
					data.setMaternityLeave(data.getMaternityLeave() - diff);
					break;
			}	
			
			leaveRepo.save(data);
		}
	}
	
	public List<LeaveHistory> getAppliedLeaves(String employeeId, String utilityType)
	{
		System.out.println("LeaveService : getAppliedLeaves()");

		List<LeaveHistory> data = new ArrayList<>();
		data = (List<LeaveHistory>) historyRepo.findByEmployeeIdAndUtilityType(employeeId, utilityType);

		return data;
	}

	public List<LeaveHistory> getAllCompOffData()
	{
		System.out.println("LeaveService : getAllCompOffData()");

		List<LeaveHistory> data = new ArrayList<>();
		data = historyRepo.findByDisplayStatus(true);
		return data;
	}

	public void saveCompOffData(LeaveHistory data)
	{
		System.out.println("LeaveService : saveCompOffData()");

		historyRepo.save(data);
    }
    
    public void availCompOff(CompOffDataModel req)
	{
		System.out.println("LeaveService : availCompOff()");

		LeaveHistory history = null;
		
		CompOffDataFields temp = new CompOffDataFields();
		Iterator<CompOffDataFields> itr = req.getCompOffData().iterator();
		while(itr.hasNext())
		{
			history = new LeaveHistory();
			temp = itr.next();
			history.setEmployeeId(req.getEmployeeId());
			history.setStartDate(temp.getStartDate());		
			history.setEndDate(temp.getEndDate());
			history.setReason(temp.getReason());
			history.setUtilityType("Availed Comp-Off");
			history.setLeaveType("N/A");
			history.setApproveStatus("pending");
			history.setDisplayStatus(true);

			historyRepo.save(history);

		}
	}

	public List<LeaveHistory> getNotifications(String supervisorId)
	{
		System.out.println("LeaveService : getNotifications()");

		List<LeaveHistory> leaveHistory = new ArrayList<>();
		leaveHistory = historyRepo.findByEmployeeIdAndApproveStatus(supervisorId,"pending");

		return leaveHistory;
	}

	public void approveRequest(LeaveHistory request)
	{
		System.out.println("LeaveService : approveRequest()");

		LeaveHistory leave = historyRepo.findByEmployeeIdAndStartDateAndEndDate(request.getEmployeeId(), request.getStartDate(), request.getEndDate());

		if(request.getUtilityType().equalsIgnoreCase("Availed Comp-Off"))
		{
			UserLeaveData userLeave = new UserLeaveData();
			userLeave = leaveRepo.findByEmployeeId(request.getEmployeeId());
			userLeave.setCompOff(userLeave.getCompOff() + 1);
			leaveRepo.save(userLeave);
		}

		leave.setApproveStatus("Approved");
		historyRepo.save(leave);
	}

	public void rejectRequest(LeaveHistory request)
	{
		System.out.println("LeaveService : rejectRequest()");

		int diff;
		LeaveHistory leave = historyRepo.findByEmployeeIdAndStartDateAndEndDate(request.getEmployeeId(), request.getStartDate(), request.getEndDate());

		if(request.getUtilityType().equalsIgnoreCase("Applied for Leave"))
		{
			UserLeaveData userLeave = new UserLeaveData();
			DateUtility util = new DateUtility();

			userLeave = leaveRepo.findByEmployeeId(request.getEmployeeId());
			diff = util.numberOfBusinessDays(request.getStartDate(),request.getEndDate());
			
			switch(request.getLeaveType())
			{
				case "Sick Leave":
					System.out.println("Case : Sick Leave");
					userLeave.setSickLeave(userLeave.getSickLeave() + diff);
					System.out.println(userLeave.getSickLeave());
					break;
				
				case "Casual Leave":
					System.out.println("Case : Casual Leave");
					userLeave.setCasualLeave(userLeave.getCasualLeave() + diff);
					break;
					
				case "Earned Leave":
					System.out.println("Case : Earned Leave");
					userLeave.setEarnedLeave(userLeave.getEarnedLeave() + diff);
					break;
					
				case "Comp-Off":
					System.out.println("Case : Comp-off");
					userLeave.setCompOff(userLeave.getCompOff() + diff);
					break;
					
				case "LOP":
					System.out.println("Case : LOP");
					userLeave.setLop(userLeave.getLop() + diff);
					break;
					
				case "Maternity Leave":
					System.out.println("Case : Maternity Leave");
					userLeave.setMaternityLeave(userLeave.getMaternityLeave() + diff);
					break;
			}

			leaveRepo.save(userLeave);
		}

		leave.setApproveStatus("Rejected");
		historyRepo.save(leave);
	}
	
}
