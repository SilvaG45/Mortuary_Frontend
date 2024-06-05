import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "rooms",
    loadChildren: () =>
      import("src/app/pages/rooms/rooms.module").then((m) => m.RoomsModule),
  },
  {
    path: "bills",
    loadChildren: () =>
      import("src/app/pages/bills/bills.module").then((m) => m.BillsModule),
  },
  {
    path: "cities",
    loadChildren: () =>
      import("src/app/pages/cities/cities.module").then((m) => m.CitiesModule),
  },
  {
    path: "departments",
    loadChildren: () =>
      import("src/app/pages/departments/departments.module").then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: "headquarters",
    loadChildren: () =>
      import("src/app/pages/headquarters/headquarters.module").then(
        (m) => m.HeadquartersModule
      ),
  },
  {
    path: "planesbyservice",
    loadChildren: () =>
      import("src/app/pages/planesbyservice/planesbyservice.module").then(
        (m) => m.PlanesbyserviceModule
      ),
  },
  {
    path: "administrators",
    loadChildren: () =>
      import("src/app/pages/administrators/administrators.module").then(
        (m) => m.AdministratorsModule
      ),
  },
  {
    path: "drivers",
    loadChildren: () =>
      import("src/app/pages/drivers/drivers.module").then(
        (m) => m.DriversModule
      ),
  },
  {
    path: "holders",
    loadChildren: () =>
      import("src/app/pages/holders/holders.module").then(
        (m) => m.HoldersModule
      ),
  },
  {
    path: "beneficiaries",
    loadChildren: () =>
      import("src/app/pages/beneficiaries/beneficiaries.module").then(
        (m) => m.BeneficiariesModule
      ),
  },
  {
    path: "customers",
    loadChildren: () =>
      import("src/app/pages/customers/customers.module").then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: "memberships",
    loadChildren: () =>
      import("src/app/pages/memberships/memberships.module").then(
        (m) => m.MembershipsModule
      ),
  },
  {
    path: "plans",
    loadChildren: () =>
      import("src/app/pages/plans/plans.module").then((m) => m.PlansModule),
  },
  {
    path: "service-executions",
    loadChildren: () =>
      import("src/app/pages/service-executions/service-executions.module").then(
        (m) => m.ServiceExecutionsModule
      ),
  },
  {
    path: "services",
    loadChildren: () =>
      import("src/app/pages/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: "messages",
    loadChildren: () =>
      import("src/app/pages/messages/messages.module").then(
        (m) => m.MessagesModule
      ),
  },
  {
    path: "chat-rooms",
    loadChildren: () =>
      import("src/app/pages/chat-rooms/chat-rooms.module").then(
        (m) => m.ChatRoomsModule
      ),
  },
  {
    path: "comments-and-ratings",
    loadChildren: () =>
      import(
        "src/app/pages/comments-and-ratings/comments-and-ratings.module"
      ).then((m) => m.CommentsAndRatingsModule),
  },
];
