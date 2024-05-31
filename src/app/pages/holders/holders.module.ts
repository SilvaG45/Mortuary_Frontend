import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoldersRoutingModule } from './holders-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    HoldersRoutingModule
  ]
})
export class HoldersModule { }
