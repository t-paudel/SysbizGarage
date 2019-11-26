import { Component, OnInit } from '@angular/core';
import { UserMapping } from '../model/user-mapping';
import { FormGroupDirective, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.scss']
})
export class UserMappingComponent implements OnInit {

  userMappingForm : FormGroup;
  user : UserMapping;
  clicked:boolean;
  userList : string[];
  managerList : string[];
  teamLeadList : string[];
  supervisorList : string[];

  constructor(private userService:UserService, private snackBar:MatSnackBar, private formDirective: FormGroupDirective) { }

  ngOnInit() {
    console.log('ngOnInit()');

    this.userService.getUnmappedUserList().subscribe((data:string[]) => {
      this.userList = data;
    });

    this.userService.getEmployeeList('manager').subscribe((data:string[]) => {
      this.managerList = data;
    });

    this.userService.getEmployeeList('supervisor').subscribe((data:string[]) => {
      this.supervisorList = data;
    });

    this.userService.getEmployeeList('team lead').subscribe((data:string[]) => {
      this.teamLeadList = data;
    });
    
    this.userMappingForm = new FormGroup({
      userId : new FormControl('',Validators.required),
      teamLead : new FormControl('',Validators.required),
      supervisor : new FormControl('',Validators.required),
      manager : new FormControl('',Validators.required)
    });
  }

  get control()
  {
    return this.userMappingForm.controls;
  }

  submitForm(formDirective:FormGroupDirective)
  {
    console.log('submitForm()');

    this.clicked = !this.clicked;
    
    if(this.userMappingForm.invalid)
    {
      return;
    }

    this.user = new UserMapping();

    var fControl = this.userMappingForm.controls;

    this.user.userId = fControl.userId.value;
    this.user.teamLead = fControl.teamLead.value;
    this.user.supervisor = fControl.supervisor.value;
    this.user.manager = fControl.manager.value;

    console.log(this.user);

    this.promise(this.userService.saveUserMappingDetails(this.user)).then(() => {
      this.openSnackbar('User Mapped!!');
     
      formDirective.resetForm();
      this.clicked = false;
   }).then(() =>{
    this.promise(this.userService.getUnmappedUserList()).then((data:string[]) => {
      this.userList = data});
   });
  }

  promise(userService)
  {
    console.log('promise()');

    return new Promise((resolve,reject) => {
      userService.subscribe((data) => {resolve(data)});
    });
  }

  openSnackbar(message:string)
  {
    console.log('openSnackbar()');

    return this.snackBar.open(message, null,{
      duration: 1500,
      verticalPosition: 'top'
    });
  }

}
