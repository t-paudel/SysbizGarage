import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { AvailCompOffModel } from '../model/avail-comp-off-model';
import { AvailCompOff } from '../model/avail-comp-off';
import { LeaveService } from 'src/app/services/leave.service';
import { MatDatepickerInputEvent, MatDialog, MatSnackBar } from '@angular/material';
import { DateOverlapDialogBoxComponent } from '../date-overlap-dialog-box/date-overlap-dialog-box.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avail-comp-off',
  templateUrl: './avail-comp-off.component.html',
  styleUrls: ['./avail-comp-off.component.scss']
})
export class AvailCompOffComponent implements OnInit {

  pipe = new DatePipe('en-US');
  minEndDate:Date[]=[];
  availCompOffForm : FormGroup;
  compOffModel : AvailCompOffModel;
  compOffModelList : AvailCompOffModel[];
  compOff : AvailCompOff;
  employeeId : string = "DEV1247";

  
  constructor(private leaveService: LeaveService, private fb:FormBuilder,private dialog: MatDialog, private snackBar: MatSnackBar, private formDirective:FormGroupDirective) { }

  ngOnInit() {
    console.log('ngOnInit()');
    this.availCompOffForm = this.initializeForm();
  }

  initializeForm()
  {
    return this.fb.group({
      'dataRow' : this.fb.array([this.addRowForCompOff()])
    });
  }

  myFilter = (d: Date): boolean => 
  {
    const day = d.getDay();
    return day != 0 && day != 6;
  }

  enableEndDate( event: MatDatepickerInputEvent<Date>,i:number)
  {
    console.log('enableEndDate()');
    this.minEndDate[i] = event.value;
    this.getControls(this.availCompOffForm)[i].get('endDate').enable();
  }

  getControls(applyLeaveForm)
  {
    return (<FormArray>applyLeaveForm.get('dataRow')).controls;
  }

  getMinDate(i:number)
  {
    return this.minEndDate[i];
  }

  addRowForCompOff():FormGroup{
    console.log('addRowForCompOff()');
    return this.fb.group({
      startDate :['',Validators.required],
      endDate : [{value:'',disabled:true},Validators.required],
      reason : ['',Validators.required]
    });
  }

  addRowForCompOffButtonClick()
  {
    console.log('addRowForCompOffButtonClick');
    (<FormArray>this.availCompOffForm.get('dataRow')).push(this.addRowForCompOff());
  }
  
  deleteRowForCompOffButtonClick(dataRowIndex:number)
  {
    console.log('deleteRowForCompOffButtonClick()');
    const compOffFormArray = <FormArray>this.availCompOffForm.get('dataRow');
    compOffFormArray.removeAt(dataRowIndex);
  }

  submitCompOffForm(formDirective:FormGroupDirective)
  {
    console.log('submitCompOffForm()');
    
    const array = <FormArray>this.availCompOffForm.get('dataRow');
    var length = array.controls.length - 1;

    var d1,d2,endDate;

    this.compOffModelList = [];
    while(length >= 0)
    {
      d1 = Date.parse(array.controls[length].value.startDate);
      d2 = Date.parse(array.controls[length].value.endDate);
      
      for(var i = d1;i<=d2;i=i+86400000)
      {
        this.compOffModel = new AvailCompOffModel();

        endDate = i + (86400000*60);
        this.compOffModel.startDate = new Date(i);
        this.compOffModel.endDate =  new Date(endDate);
        this.compOffModel.reason = array.controls[length].value.reason;
        
        this.compOffModelList.push(this.compOffModel);
      }
      length = length - 1;
    }

    this.compOff = new AvailCompOff();
    this.compOff.employeeId = this.employeeId;
    this.compOff.compOffData = this.compOffModelList;

    
     this.promise(this.leaveService.availCompOff(this.compOff)).then(() =>{
       this.openSnackBar('Comp-Off Applied Successfully');
      
       this.availCompOffForm = this.initializeForm();
       formDirective.resetForm();
       });
   }

  checkDateOverlap()
  {
    console.log('checkDateOverlap()');
    
    const form = this.getControls(this.availCompOffForm);
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

  openSnackBar(message: string) {
    return this.snackBar.open(message, null,{
     duration: 2000,
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
    form[length].get('endDate').disable();
  }

  promise(leaveService)
  {
      return new Promise((resolve,reject) => {
        leaveService.subscribe(
          (data) => {
          resolve(data);
        });
     });
  }

}
