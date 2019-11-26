package com.sysbizGarage.payroll.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sysbizGarage.payroll.dto.LeaveHistory;
import com.sysbizGarage.payroll.dto.UserLeaveData;

@Service
public class ScheduledJobsService 
{
    @Autowired
    private LeaveService leaveService;

    
    @Scheduled(cron="0 0 12 1 * ?")  //runs on 1st of every month at 12 noon to update earned leaves
    public void addLeavesMonthly()
    {
        System.out.println("Running Cron job = monthly()");
        List<UserLeaveData> userLeaves  = new ArrayList<>();
        UserLeaveData leaves;
        userLeaves = leaveService.getAllUsersLeaveData();
        Iterator<UserLeaveData> itr = userLeaves.iterator();

        while(itr.hasNext())
        {
            leaves = new UserLeaveData();
            leaves = itr.next();
            leaves.setEarnedLeave(leaves.getEarnedLeave()+1);
            leaveService.saveUsersLeaveData(leaves);
        }
    }   
    
    @Scheduled(cron = "0 0 12 1 1 ?")   //runs every year 1st Jan to update yearly leaves
    public void editLeavesYearly()
    {
        System.out.println("Running Cron job = yearly()");
        List<UserLeaveData> userLeaves  = new ArrayList<>();
        UserLeaveData leaves;
        userLeaves = leaveService.getAllUsersLeaveData();
        Iterator<UserLeaveData> itr = userLeaves.iterator();
        int earnedLeaves;

        while(itr.hasNext())
        {
            leaves = new UserLeaveData();
            leaves = itr.next();

            leaves.setSickLeave(6);
            leaves.setCasualLeave(6);
            earnedLeaves = leaves.getEarnedLeave()/2;
            earnedLeaves = earnedLeaves + 1;
            leaves.setEarnedLeave(earnedLeaves);

            leaveService.saveUsersLeaveData(leaves);
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")    //runs everyday at midnight - 12am
    public void updateCompOffData()
    {
        System.out.println("Running Cron job = updateCompOffData()");
        List<LeaveHistory> data = new ArrayList<>();
        LeaveHistory compOff;
        Iterator<LeaveHistory> itr;
        Date currentDate = new Date();

        data = leaveService.getAllCompOffData();
        itr = data.iterator();

        while(itr.hasNext())
        {
            compOff = new LeaveHistory();
            compOff = itr.next();
            
            if(currentDate.getTime() > compOff.getEndDate().getTime())
            {
                compOff.setDisplayStatus(false);
                leaveService.saveCompOffData(compOff);
            }
        }
    }
}