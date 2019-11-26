import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { IndexComponent } from './index/index.component';
import { UserPersonalDetailsComponent } from './user-personal-details/user-personal-details.component';
import { RoleMappingComponent } from './role-mapping/role-mapping.component';
import { UserMappingComponent } from './user-mapping/user-mapping.component';
import { UserOrganizationDetailsComponent } from './user-organization-details/user-organization-details.component';


const routes: Routes = [
    {
      path:'index',
      component : IndexComponent,
      data : {title : 'Employee Info'},
      canActivate : [AuthGuard]
    },
    {
      path:'user-personal-details',
      component : UserPersonalDetailsComponent,
      data : {title : 'User Personal Details'},
      canActivate : [AuthGuard]
    },
    {
      path:'user-organization-details',
      component : UserOrganizationDetailsComponent,
      data : {title : 'User Organization Details'},
      canActivate : [AuthGuard]
    },
    {
      path:'user-mapping',
      component : UserMappingComponent,
      data : {title : 'User Mapping Details'},
      canActivate : [AuthGuard]
    },
    {
      path:'role-mapping',
      component : RoleMappingComponent,
      data : {title : 'Role Mapping Details'},
      canActivate : [AuthGuard]
    }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AppsRouterModule {}
