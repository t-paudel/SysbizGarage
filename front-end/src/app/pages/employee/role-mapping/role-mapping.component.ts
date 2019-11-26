import { Component, OnInit } from '@angular/core';
import { RoleMapping } from '../model/role-mapping';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-role-mapping',
  templateUrl: './role-mapping.component.html',
  styleUrls: ['./role-mapping.component.scss']
})
export class RoleMappingComponent implements OnInit {

  roleMappingForm : FormGroup;
  role : RoleMapping;
  clicked:boolean;

  constructor(private userService:UserService, private snackBar:MatSnackBar, private formDirective: FormGroupDirective) { }

  ngOnInit() {
    console.log('ngOnInit()');

    this.roleMappingForm = new FormGroup({
      roleId : new FormControl('',Validators.required),
      roleName : new FormControl('',Validators.required)
    });
  }

  get control()
  {
    return this.roleMappingForm.controls;
  }

  submitForm(formDirective:FormGroupDirective)
  {
    console.log('submitForm()');
    
    this.clicked = !this.clicked;
    
    if(this.roleMappingForm.invalid)
    {
      return;
    }

    this.role = new RoleMapping();

    var fControl = this.roleMappingForm.controls;
    
    this.role.roleId = fControl.roleId.value;
    this.role.roleName = fControl.roleName.value;
    

    console.log(this.role);

    this.promise(this.userService.saveUserRoleMappingDetails(this.role)).then(() => {
      this.openSnackbar('User Details Saved');
     
      formDirective.resetForm();
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
