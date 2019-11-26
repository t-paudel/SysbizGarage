import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { AntdRouterModule } from './antd-routing.module'
// antd
import { AntdIndexComponent } from 'src/app/pages/antd/index/index.component'
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
var moment = require('moment');


const COMPONENTS = [AntdIndexComponent]

@NgModule({
  imports: [SharedModule, AntdRouterModule,MaterialModule,ReactiveFormsModule,FormsModule],
  declarations: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AntdModule {}
