import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // Importa ReactiveFormsModule
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TwoFactorAuthComponent } from "./pages/two-factor-auth/two-factor-auth.component";
import { DifuntosComponent } from './pages/difuntos/difuntos.component';
import { ListComponent } from './pages/difuntos/list/list.component';
import { ManageComponent } from './pages/difuntos/manage/manage.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // Agrega ReactiveFormsModule aquí
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TwoFactorAuthComponent,
    DifuntosComponent,
    ListComponent,
    ManageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
