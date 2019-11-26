import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvailableLeaves } from '../model/available-leaves';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-add-newuser-leaves',
  templateUrl: './add-newuser-leaves.component.html',
  styleUrls: ['./add-newuser-leaves.component.scss']
})
export class AddNewuserLeavesComponent implements OnInit {

  formData : FormGroup;
  leaves:AvailableLeaves;
  submitted:Boolean;
  
  constructor(private leaveService:LeaveService) { }

  ngOnInit() {
    this.formData = new FormGroup({
      empId : new FormControl('',Validators.required),
      sickLeave : new FormControl(''),
      casualLeave : new FormControl(''),
      earnedLeave : new FormControl(''),
      maternityLeave : new FormControl(''),
      compOff : new FormControl(''),
      lop : new FormControl('')
    })
  }

  addLeaves()
  {
    console.log('inside addLeaves()');
    
    this.submitted = true;
    if(this.formData.invalid)
    {
      this.formData.reset();
      return;
    }

    this.leaves = new AvailableLeaves();
    this.leaves.employeeId = this.formData.controls['empId'].value;
    this.leaves.sickLeave = this.formData.controls['sickLeave'].value;
    this.leaves.casualLeave = this.formData.controls['casualLeave'].value;
    this.leaves.earnedLeave = this.formData.controls['earnedLeave'].value;
    this.leaves.lop = this.formData.controls['lop'].value;
    this.leaves.compOff = this.formData.controls['compOff'].value;
    this.leaves.maternityLeave = this.formData.controls['maternityLeave'].value;
    console.log(this.leaves)

    this.leaveService.addNewUserLeaves(this.leaves).subscribe(() => {});

    this.formData.reset();
    this.submitted = false;
  }

  get control()
  {
    return this.formData.controls;
  }

}
