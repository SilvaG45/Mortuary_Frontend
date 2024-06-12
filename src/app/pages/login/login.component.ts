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
        console.log(
          "La respuesta del microservicio de seguridad es " +
            JSON.stringify(data)
        );
        if (data.twoFactorRequired) {
          this.isTwoFactorEnabled = true;
        } else {
          this.theSecurityservice.saveSession(data);
          this.router.navigate(["dashboard"]);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          Swal.fire(
            "Error de autenticación",
            "Usuario o Contraseña incorrectas",
            "error"
          );
        }
      },
    });
  }

  verifyTwoFactorCode() {
    const userId = this.theSecurityservice.activeUserSession._id;
    this.theSecurityservice
      .verifyTwoFactorCode(userId, this.twoFactorCode)
      .subscribe({
        next: (data: AuthResponse) => {
          this.theSecurityservice.saveSession(data);
          this.router.navigate(["dashboard"]);
        },
        error: (error) => {
          Swal.fire(
            "Error de autenticación",
            "Código de verificación incorrecto",
            "error"
          );
        },
      });
  }
}
