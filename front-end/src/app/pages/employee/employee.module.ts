import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { AppsRouterModule } from './employee-routing.module'
import { HrApplicationModule } from '../../components/HrApplicationComponents/hrapplication.module'
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { RoleMappingComponent } from './role-mapping/role-mapping.component';
import { UserMappingComponent } from './user-mapping/user-mapping.component';
import { UserOrganizationDetailsComponent } from './user-organization-details/user-organization-details.component';
import { UserPersonalDetailsComponent } from './user-personal-details/user-personal-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSnackBarModule } from '@angular/material';
// antd


@NgModule({
  imports: [
    SharedModule, 
    AppsRouterModule, 
    HrApplicationModule,
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule
  ],
  declarations: [
    IndexComponent, 
    RoleMappingComponent, 
    UserMappingComponent, 
    UserOrganizationDetailsComponent, 
    UserPersonalDetailsComponent
  ],
  providers: [FormGroupDirective]

})
export class EmployeeModule {}
