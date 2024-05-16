import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadquartersRoutingModule } from './headquarters-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    HeadquartersRoutingModule
  ]
})
export class HeadquartersModule { }
