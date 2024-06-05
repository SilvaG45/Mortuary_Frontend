import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BillsRoutingModule } from "./bills-routing.module";
import { ManageComponent } from "./manage/manage.component";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ManageComponent, ListComponent],
  imports: [CommonModule, BillsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class BillsModule {}
