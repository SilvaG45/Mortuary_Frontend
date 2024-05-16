import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'rooms', loadChildren: () => import('src/app/pages/rooms/rooms.module').then(m => m.RoomsModule)},
    { path: 'bills', loadChildren: () => import('src/app/pages/bills/bills.module').then(m => m.BillsModule)},
    { path: 'cities', loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)},
    { path: 'departments', loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)},
    { path: 'headquarters', loadChildren: () => import('src/app/pages/headquarters/headquarters.module').then(m => m.HeadquartersModule)},
    { path: 'planesbyservice', loadChildren: () => import('src/app/pages/planesbyservice/planesbyservice.module').then(m => m.PlanesbyserviceModule)},




];
