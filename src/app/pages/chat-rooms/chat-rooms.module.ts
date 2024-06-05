import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatRoomsRoutingModule } from "./chat-rooms-routing.module";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListComponent, ManageComponent],
  imports: [
    CommonModule,
    ChatRoomsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChatRoomsModule {}
