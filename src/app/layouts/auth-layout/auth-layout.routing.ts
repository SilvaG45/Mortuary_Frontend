import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { TwoFactorAuthComponent } from 'src/app/pages/two-factor-auth/two-factor-auth.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'two-factor-auth', component: TwoFactorAuthComponent },

];
