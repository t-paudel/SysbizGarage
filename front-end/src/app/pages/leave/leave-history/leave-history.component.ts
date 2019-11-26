import { Component, OnInit } from '@angular/core';
import { Userdatastructure } from '../model/userdatastructure';
import { LeaveRequest } from '../model/leave-request';
import { LeaveHistory } from '../model/leave-history';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss']
})
export class LeaveHistoryComponent implements OnInit {

  dataSourceForLeave: Userdatastructure;
  leave: LeaveRequest;
  employeeId : string = "DEV1247";

  dataSourceForHistory:LeaveHistory;
  
  displayedColumnsForHistory: string[] = ["Utility", "Start Date", "End Date", "Leave Type", "Reason", "Status"];

  
  constructor(private leaveService:LeaveService) { }

  ngOnInit() {
    this.leaveService.getLeaveHistory(this.employeeId).subscribe((data: LeaveHistory) => {
      this.dataSourceForHistory = data
    });
  }
}
