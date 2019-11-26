import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserPersonalDetails } from '../model/user-personal-details';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-personal-details',
  templateUrl: './user-personal-details.component.html',
  styleUrls: ['./user-personal-details.component.scss']
})
export class UserPersonalDetailsComponent implements OnInit {

  constructor(private userService:UserService, private snackBar:MatSnackBar, private formDirective: FormGroupDirective) { }

  personalDetailsForm : FormGroup;
  user : UserPersonalDetails;
  clicked : boolean;
  autofill : boolean=false;

  ngOnInit() {
    console.log('ngOnInit()');

    this.personalDetailsForm = new FormGroup({
      firstName : new FormControl('',Validators.required),
      middleName : new FormControl(''),
      lastName : new FormControl('',Validators.required),
      motherName : new FormControl('',Validators.required),
      fatherName : new FormControl('',Validators.required),
      permanentAddress : new FormControl('',Validators.required),
      permanentAddressPincode : new FormControl('',Validators.required),
      currentAddress : new FormControl('',Validators.required),
      currentAddressPincode : new FormControl('',Validators.required),
      contactNumber1 : new FormControl('',Validators.required),
      contactNumber2 : new FormControl(''),
      emergencyContactNumber1 : new FormControl('',Validators.required),
      emergencyContactNumber2 : new FormControl(''),
      emailId : new FormControl('',Validators.required),
      dob : new FormControl('')
    });
  }

  get control()
  {
    return this.personalDetailsForm.controls;
  }

  submitForm(formDirective:FormGroupDirective)
  {
    console.log('submitForm()');

    this.clicked = !this.clicked;
    if(this.personalDetailsForm.invalid)
      return;
  
    this.user = new UserPersonalDetails();

    var fControl = this.personalDetailsForm.controls;
    
    this.user.firstName = fControl.firstName.value;
    this.user.middleName = fControl.middleName.value;
    this.user.lastName = fControl.lastName.value;
    this.user.motherName = fControl.motherName.value;
    this.user.fatherName = fControl.fatherName.value;
    this.user.permanentAddress = fControl.permanentAddress.value;
    this.user.permanentAddressPincode =fControl.permanentAddressPincode.value;
    this.user.currentAddress = fControl.currentAddress.value;
    this.user.currentAddressPincode = fControl.currentAddressPincode.value;
    this.user.contactNumber1 = fControl.contactNumber1.value;
    this.user.contactNumber2 = fControl.contactNumber2.value;
    this.user.emergencyContactNumber1 = fControl.emergencyContactNumber1.value;
    this.user.emergencyContactNumber2 = fControl.emergencyContactNumber2.value;
    this.user.personalEmailId = fControl.emailId.value;
    this.user.dob = fControl.dob.value;

    console.log(this.user);

    this.promise(this.userService.saveUserPersonalDetails(this.user)).then(() => {
      this.openSnackbar('User Details Saved');
     
      formDirective.resetForm();
      console.log(formDirective.name);
    })
  }

  populateAddress()
  {
    console.log('populateAddress()');

    var fcontrol = this.personalDetailsForm.controls;
    if(this.autofill)
    {
      fcontrol.currentAddress.setValue(fcontrol.permanentAddress.value);
      fcontrol.currentAddressPincode.setValue(fcontrol.permanentAddressPincode.value);
    }
    else
    {
      fcontrol.currentAddress.setValue('');
      fcontrol.currentAddressPincode.setValue('');
    }
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
