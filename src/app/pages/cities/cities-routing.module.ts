import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: "/list",
    component: ListComponent,
  },
  {
    path: "/create",
    component: ManageComponent,
  },
  {
    path: "update/:id",
    component: ManageComponent,
  },
  {
    path: "/view/:id",
    component: ManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }