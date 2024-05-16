import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesbyserviceRoutingModule } from './planesbyservice-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PlanesbyserviceRoutingModule
  ]
})
export class PlanesbyserviceModule { }
