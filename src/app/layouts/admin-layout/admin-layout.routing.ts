import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { TwoFactorAuthComponent } from "src/app/pages/two-factor-auth/two-factor-auth.component";
import { LoginComponent } from "src/app/pages/login/login.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "user-profile",
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "two-factor-auth", component: TwoFactorAuthComponent },
  { path: "login", component: LoginComponent },
  {
    path: "rooms",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/rooms/rooms.module").then((m) => m.RoomsModule),
  },
  {
    path: "bills",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/bills/bills.module").then((m) => m.BillsModule),
  },
  {
    path: "cities",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/cities/cities.module").then((m) => m.CitiesModule),
  },
  {
    path: "departments",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/departments/departments.module").then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: "headquarters",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/headquarters/headquarters.module").then(
        (m) => m.HeadquartersModule
      ),
  },
  {
    path: "planesbyservice",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/planesbyservice/planesbyservice.module").then(
        (m) => m.PlanesbyserviceModule
      ),
  },
  {
    path: "administrators",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/administrators/administrators.module").then(
        (m) => m.AdministratorsModule
      ),
  },
  {
    path: "burials",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/burials/burials.module").then(
        (m) => m.BurialsModule
      ),
  },
  {
    path: "cremations",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/cremations/cremations.module").then(
        (m) => m.CremationsModule
      ),
  },
  {
    path: "relocations",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/relocations/relocations.module").then(
        (m) => m.RelocationsModule
      ),
  },
  {
    path: "drivers",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/drivers/drivers.module").then(
        (m) => m.DriversModule
      ),
  },

  {
    path: "holders",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/holders/holders.module").then(
        (m) => m.HoldersModule
      ),
  },
  {
    path: "beneficiaries",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/beneficiaries/beneficiaries.module").then(
        (m) => m.BeneficiariesModule
      ),
  },
  {
    path: "customers",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/customers/customers.module").then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: "memberships",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/memberships/memberships.module").then(
        (m) => m.MembershipsModule
      ),
  },
  {
    path: "plans",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/plans/plans.module").then((m) => m.PlansModule),
  },
  {
    path: "service-executions",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/service-executions/service-executions.module").then(
        (m) => m.ServiceExecutionsModule
      ),
  },
  {
    path: "services",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: "messages",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/messages/messages.module").then(
        (m) => m.MessagesModule
      ),
  },
  {
    path: "chat-rooms",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/chat-rooms/chat-rooms.module").then(
        (m) => m.ChatRoomsModule
      ),
  },
  {
    path: "comments-and-ratings",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        "src/app/pages/comments-and-ratings/comments-and-ratings.module"
      ).then((m) => m.CommentsAndRatingsModule),
  },
];
