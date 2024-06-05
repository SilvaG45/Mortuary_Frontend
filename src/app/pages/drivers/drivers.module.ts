import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DriversRoutingModule } from "./drivers-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DriversRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DriversModule {}
