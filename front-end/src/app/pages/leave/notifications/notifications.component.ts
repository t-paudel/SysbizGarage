import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { LeaveHistory } from '../model/leave-history';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  leaveHistory:LeaveHistory[]=[];
  supervisorId = 'DEV1247';

  constructor(private leaveService:LeaveService, private snackBar:MatSnackBar) { }

  ngOnInit() 
  {
    console.log('ngOnInit()');

    this.leaveService.getPendingNotifications(this.supervisorId).subscribe((data:LeaveHistory[]) => {
      this.leaveHistory = data;
    });
  }

  approveRequest(request:LeaveHistory)
  {
    console.log('approveRequest()');

    this.promise(this.leaveService.approveRequest(request)).then(()=>{
      this.openSnackBar('Request approved');
      this.leaveService.getPendingNotifications(this.supervisorId).subscribe((data:LeaveHistory[]) => {
        this.leaveHistory = data;
      });
    })
  }

  rejectRequest(request:LeaveHistory)
  {
    console.log('rejectRequest()');

    this.promise(this.leaveService.rejectRequest(request)).then(()=>{
      this.openSnackBar('Request rejected');
      this.leaveService.getPendingNotifications(this.supervisorId).subscribe((data:LeaveHistory[]) => {
        this.leaveHistory = data;
      });
    })
    
  }

  promise(leaveService)
  {
    console.log('inside promise()')  ;
    
    return new Promise((resolve,reject) => {
        leaveService.subscribe(
          (data) => {
          resolve(data);
        });
     });
  }

  openSnackBar(message: string) {
    return this.snackBar.open(message, null,{
     duration: 500,
     verticalPosition: 'top'
   });
 }
}
