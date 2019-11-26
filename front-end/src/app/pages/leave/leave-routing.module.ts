import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// pages
import { ApplyLeaveComponent } from 'src/app/pages/leave/apply-leave/apply-leave.component'
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { AvailCompOffComponent } from './avail-comp-off/avail-comp-off.component';
import { ViewLeavesComponent } from './view-leaves/view-leaves.component';
import { AddNewuserLeavesComponent } from './add-newuser-leaves/add-newuser-leaves.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: 'view-leaves',
    component: ViewLeavesComponent,
    data: { title: 'Leave Info' },
    canActivate: [AuthGuard],
  },
  {
    path: 'apply-leave',
    component: ApplyLeaveComponent,
    data: { title: 'apply leave' },
    canActivate: [AuthGuard],
  },
  {
    path: 'leave-history',
    component: LeaveHistoryComponent,
    data: { title: 'Leave History' },
    canActivate: [AuthGuard],
  },
  {
    path: 'avail-comp-off',
    component: AvailCompOffComponent,
    data: { title: 'Avail Compensatory Off' },
    canActivate: [AuthGuard],
  },
  {
    path: 'view-leaves',
    component: ViewLeavesComponent,
    data: { title: 'View Leaves' },
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    data: { title: 'Notifications' },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-newuser-leaves',
    component: AddNewuserLeavesComponent,
    data: { title: 'Add New User Leaves' },
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class PagesRouterModule {}
