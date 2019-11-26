import { Component, OnInit } from '@angular/core';
import { UserOrganizationDetails } from '../model/user-organization-details';
import { FormGroupDirective, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-organization-details',
  templateUrl: './user-organization-details.component.html',
  styleUrls: ['./user-organization-details.component.scss']
})
export class UserOrganizationDetailsComponent implements OnInit {

  organizationDetailsForm : FormGroup;
  user : UserOrganizationDetails;
  clicked:boolean;
  roleName:String[];

  constructor(private userService:UserService, private snackBar:MatSnackBar, private formDirective: FormGroupDirective) { }

  ngOnInit() {
    console.log('ngOnInit()');

    this.userService.getRoleNames().subscribe((data:String[]) => {
      this.roleName = data;
    });

    this.organizationDetailsForm = new FormGroup({
      userId : new FormControl('',Validators.required),
      roleName : new FormControl('',Validators.required),
      firstName : new FormControl('',Validators.required),
      middleName : new FormControl(''),
      lastName : new FormControl('',Validators.required),
      emailId : new FormControl('',Validators.required),
      doj : new FormControl('',Validators.required)
    });
  }

  get control()
  {
    return this.organizationDetailsForm.controls;
  }

  submitForm(formDirective:FormGroupDirective)
  {
    console.log('submitForm()');
    console.log(this.roleName);
    
    this.clicked = !this.clicked;
    
    if(this.organizationDetailsForm.invalid)
    {
      return;
    }

    this.user = new UserOrganizationDetails();

    var fControl = this.organizationDetailsForm.controls;

    console.log(fControl.userId.errors);
    
    this.user.userId = fControl.userId.value;
    this.user.roleName = fControl.roleName.value;
    this.user.firstName = fControl.firstName.value;
    this.user.middleName = fControl.middleName.value;
    this.user.lastName = fControl.lastName.value;
    this.user.organizationEmailId = fControl.emailId.value;
    this.user.doj = fControl.doj.value;

    console.log(this.user);

    this.promise(this.userService.saveUserOrganizationDetails(this.user)).then(() => {
      this.openSnackbar('User Details Saved');
     
      formDirective.resetForm();
      console.log(formDirective.name);
      this.clicked = false;
   })
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
