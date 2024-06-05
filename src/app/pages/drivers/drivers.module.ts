import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DriversRoutingModule } from "./drivers-routing.module";
import { ManageComponent } from "./manage/manage.component"; // Importa tu componente aquí
import { ListComponent } from "./list/list.component";


@NgModule({
  declarations: [
  ManageComponent,
   ListComponent
  ],

  imports: [
    CommonModule,
    DriversRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})

export class DriversModule {}
