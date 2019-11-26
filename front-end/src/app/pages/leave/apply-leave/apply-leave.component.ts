import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormGroup, FormArray, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { LeaveRequest } from '../model/leave-request';
import { ApplyLeave } from '../model/apply-leave';
import { DatePipe } from '@angular/common';
import { ReturnMessage } from '../model/return-message';
import { MatDatepickerInputEvent, MatSnackBar, MatDialog } from '@angular/material';
import { LeaveService } from 'src/app/services/leave.service';
import { Userdatastructure } from '../model/userdatastructure';
import { DateOverlapDialogBoxComponent } from '../date-overlap-dialog-box/date-overlap-dialog-box.component';
import { LeaveHistory } from '../model/leave-history';

@Component({
  selector: 'apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLeaveComponent implements OnInit {
 
  pipe = new DatePipe('en-US');

  minEndDate:Date[]=[];
  availableLeaves : Userdatastructure[];
  isClicked:Boolean=false;
  status:ReturnMessage = new ReturnMessage();
  leaveHistory : LeaveHistory[]=[];
  dateList=[];
  
  applyLeaveForm : FormGroup;
  leaveModel : LeaveRequest;
  leaveModelList : LeaveRequest[];
  applyLeave : ApplyLeave; 
  employeeId : string = "DEV1247";
  leaveType: string[] = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Comp-Off', 'LOP', 'Maternity Leave'];
  

  constructor(private leaveService:LeaveService, private fb:FormBuilder,private formDirective:FormGroupDirective ,
    private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() { 
    console.log('ngOnInit()');

    this.promise(this.leaveService.getAppliedLeaves(this.employeeId)).then((data:LeaveHistory[])=>{ 
      this.leaveHistory = data;
      this.dateList = this.listOfAppliedLeaves();
    });
    
    this.applyLeaveForm = this.initializeForm();

    this.leaveService.getAvailableLeaves(this.employeeId).subscribe((data:Userdatastructure[]) => {
      this.availableLeaves = data;
    });
   }


  initializeForm()
  {
    return this.fb.group({
      'dataRow' : this.fb.array([this.addRowToApplyLeave()])
    });

  }

  myFilter = (d: Date): boolean => 
  {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  dateClass = (d: Date) => {
    const date = Date.parse("'"+d+"'");
    for(var i = 0;i<this.dateList.length;i++)
    {
      if(this.dateList[i]===date)
      {
        return 'applied-leave';
      }
    }
  }

  enableEndDate( event: MatDatepickerInputEvent<Date>,i:number)
  {
    console.log('enableEndDate()');
    this.minEndDate[i] = event.value;
    this.getControls(this.applyLeaveForm)[i].get('endDate').enable();
  }

  getControls(applyLeaveForm)
  {
    return (<FormArray>applyLeaveForm.get('dataRow')).controls;
  }

  getMinDate(i:number)
  {
    return this.minEndDate[i];
  }

  enableLeaveType(i:number)
  {
    console.log('enableLeaveType()');
    this.getControls(this.applyLeaveForm)[i].get('leaveType').enable();
    this.checkDateOverlap();
  }

  checkAvailableLeaves(event,i:number)
  {
    console.log('checkAvailableLeaves()');
    console.log('leave type = ' + event);
    this.isClicked = true;
    var fControl = this.getControls(this.applyLeaveForm)[i];
   
    var leaves;
    
    for(var j = 0;j<this.availableLeaves.length;j++)
    {
      if(this.availableLeaves[j].leaveType===event)
      {
        leaves=this.availableLeaves[j].noOfLeaves;
        console.log('leaves available = ' + leaves);
        break;
      }
    } 
    
    var diff = this.calculateBusinessDays(fControl.get('startDate').value,fControl.get('endDate').value);
    diff=diff+1; // to include both the dates.

    console.log("difference = " + diff);

    if(diff>leaves)
    {
      this.status.flag = false;
      this.status.message = "You do not have enough " + event + ".";
      fControl.get('leaveType').reset();
    }
    else
    {
      this.status.flag = true;
    }
  }

  addRowToApplyLeave()
  {
    console.log('addRowToApplyLeave()');
    return this.fb.group({
      startDate :['',Validators.required],
      endDate : [{value:'',disabled:true},Validators.required],
      leaveType : [{value:'',disabled:true},Validators.required],
      reason : ['']
    });
  }

  addRowForApplyLeaveButtonClick()
  {
    console.log('addRowForCompOffButtonClick()');
    (<FormArray>this.applyLeaveForm.get('dataRow')).push(this.addRowToApplyLeave());
  }
  
  deleteRowForApplyLeaveButtonClick(dataRowIndex:number)
  {
    console.log('deleteRowForApplyLeaveButtonClick()');
   (<FormArray>this.applyLeaveForm.get('dataRow')).removeAt(dataRowIndex);
  }

  submitLeavesForm(formDirective:FormGroupDirective) 
  {
    console.log('submitLeavesForm()');

    var form = this.getControls(this.applyLeaveForm);

    this.checkDateOverlap();

    var length = form.length - 1 
    
    this.leaveModelList = [];
    while(length>=0)
    {
      this.leaveModel = new LeaveRequest();

      this.leaveModel.startDate = form[length].value.startDate; //this.pipe.transform(form[length].value.startDate,'yyyy-MM-dd');
      this.leaveModel.endDate = form[length].value.endDate; //this.pipe.transform(form[length].value.endDate,'yyyy-MM-dd');
      this.leaveModel.leaveType = form[length].value.leaveType;
      this.leaveModel.reason = form[length].value.reason;


      this.leaveModelList.push(this.leaveModel);
      length = length - 1;
    }

    this.applyLeave = new ApplyLeave();
    this.applyLeave.employeeId = this.employeeId;
    this.applyLeave.leaveRequest = this.leaveModelList;

    this.promise(this.leaveService.applyLeave(this.applyLeave)).then(() => {
      this.openSnackBar('Leave Applied Successfully');
      this.applyLeaveForm = this.initializeForm();
      formDirective.resetForm();

      this.leaveService.getAvailableLeaves(this.employeeId).subscribe((data:Userdatastructure[]) => {
        this.availableLeaves = data;
      });
    });
    
  }

  checkDateOverlap()
  {
    console.log('checkDateOverlap()');
    
    const form = this.getControls(this.applyLeaveForm);
    var startDate;
    var endDate;
    var checkDate;
    if(form.length>1)
    {
      checkDate = Date.parse(form[form.length-1].get('startDate').value);

      for(var i=0;i<form.length-1;i++)
      {
        startDate = Date.parse(form[i].get('startDate').value);
        endDate = Date.parse(form[i].get('endDate').value);
      
        if(checkDate>=startDate && checkDate<=endDate)
        {
          this.openDialog(form);
          break;
        }
      }
    }
  }

  calculateBusinessDays(startDate,endDate)
  {
    console.log('calculateBusinessDays()');
    var moment = require('moment-business-days');
    return moment(startDate).businessDiff(moment(endDate));
  }

  openSnackBar(message: string) {
     return this.snackBar.open(message, null,{
      duration: 1500,
      verticalPosition: 'top'
    });
  }

  openDialog(form) : void
  {
    const dialogRef = this.dialog.open(DateOverlapDialogBoxComponent,{
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(() =>{
      console.log('Dialog box was closed.');
      this.dateOverlapDisable(form);
    });
  }

  dateOverlapDisable(form)
  {
    console.log('dateOverlapDisable()');
    var length = form.length - 1;
    form[length].get('startDate').reset();
    form[length].get('endDate').reset();
    form[length].get('leaveType').reset();
    form[length].get('endDate').disable();
    form[length].get('leaveType').disable();
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

  listOfAppliedLeaves() 
  {
    console.log('listOfAppliedLeaves()');
    var dates=[];
    var d1,d2;
    for(var i=0;i<this.leaveHistory.length;i++)
    {
      d1 = this.leaveHistory[i].startDate.getTime();
      d2 = this.leaveHistory[i].endDate.getTime();
      for(var j = d1; j<=d2; j=j+86400000)
      {
        dates.push(j);
      }
    }
    return dates;
  }
}