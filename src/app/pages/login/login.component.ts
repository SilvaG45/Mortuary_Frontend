import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import Swal from "sweetalert2";
import { AuthResponse } from "src/app/models/auth-response.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser: User;
  isTwoFactorEnabled: boolean = false;
  twoFactorCode: number;
  userId: string | undefined;

  constructor(
    private theSecurityservice: SecurityService,
    private router: Router
  ) {
    this.theUser = {
      email: "",
      password: "",
    };
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.theSecurityservice.login(this.theUser).subscribe({
      next: (data: AuthResponse) => {
        console.log('La respuesta del microservicio de seguridad es ' + JSON.stringify(data));
        if (data) {
          this.router.navigate(['/two-factor-auth']); // Redirigir al componente de segundo factor
        } else {
          this.theSecurityservice.saveSession(data);
          this.router.navigate(['/dashboard']); // Redirigir al dashboard si no se necesita segundo factor
        }
      },
      error: (error) => {
        if (error.status === 401) {
          alert('Usuario o Contraseña incorrectas');
        }
      }
    });
  }
}
