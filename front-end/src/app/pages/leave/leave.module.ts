import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { PagesRouterModule } from './leave-routing.module'
import { HrApplicationModule } from 'src/app/components/HrApplicationComponents/hrapplication.module'

// pages
import { ApplyLeaveComponent } from 'src/app/pages/leave/apply-leave/apply-leave.component'
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms'
import { LeaveService } from 'src/app/services/leave.service';
import { LeaveHistoryComponent } from './leave-history/leave-history.component'
import { MatTableModule, MatDatepickerModule, MatPaginatorModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { AvailCompOffComponent } from './avail-comp-off/avail-comp-off.component';
import { ViewLeavesComponent } from './view-leaves/view-leaves.component';
import { AddNewuserLeavesComponent } from './add-newuser-leaves/add-newuser-leaves.component';
import { DateOverlapDialogBoxComponent } from './date-overlap-dialog-box/date-overlap-dialog-box.component';
import { NotificationsComponent } from './notifications/notifications.component';

const COMPONENTS = [
  ApplyLeaveComponent,
  LeaveHistoryComponent
]

@NgModule({
  imports: [SharedModule, PagesRouterModule, HrApplicationModule, FormsModule, ReactiveFormsModule,MatTableModule,MatDatepickerModule,
    MatNativeDateModule, MatInputModule, MatSelectModule, MatButtonModule, MatPaginatorModule],
  declarations: [...COMPONENTS, AvailCompOffComponent, ViewLeavesComponent, AddNewuserLeavesComponent, DateOverlapDialogBoxComponent, NotificationsComponent],
  providers: [LeaveService, FormGroupDirective],
  entryComponents: [DateOverlapDialogBoxComponent]
})
export class LeaveModule {}
