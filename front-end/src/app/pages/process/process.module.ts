import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { ProcessComponent } from './processscheduler/process.component';
import { ProcessRouterModule } from './process-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
    imports: [AgGridModule.withComponents([]),MaterialModule,CommonModule,FormsModule,ProcessRouterModule],
    declarations: [ProcessComponent],
})
export class ProcessModule {}
