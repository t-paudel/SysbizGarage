import { Component, OnInit } from '@angular/core';
import { Userdatastructure } from '../model/userdatastructure';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-view-leaves',
  templateUrl: './view-leaves.component.html',
  styleUrls: ['./view-leaves.component.scss']
})
export class ViewLeavesComponent implements OnInit {

  leaveType: string[] = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Comp-Off', 'LOP', 'Maternity Leave'];
  displayedColumnsForLeave: string[] = ['Leave Type', 'Available Leaves'];
  dataSourceForLeave: Userdatastructure;
  employeeId : string = "DEV1247";
  
  constructor(private leaveService : LeaveService) { }

  ngOnInit() {
    this.leaveService.getAvailableLeaves(this.employeeId).subscribe((data:Userdatastructure) =>{
      this.dataSourceForLeave = data;
    });
  }

}
