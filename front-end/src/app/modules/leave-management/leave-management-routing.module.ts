import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard';

const routes: Routes = [
  {
    path:'index',
    component : IndexComponent,
    data : {title : 'Employee Info'},
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveManagementRoutingModule { }
