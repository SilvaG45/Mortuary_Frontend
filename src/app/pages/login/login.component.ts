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
        console.log(
          "La respuesta del microservicio de seguridad es " +
            JSON.stringify(data)
        );
        if (data) {
          this.userId = data.user?._id;
          Swal.fire(
            "Código de verificación",
            "Se ha enviado un código de verificación a tu correo electrónico.",
            "info"
          );
          this.router.navigate(["/two-factor-auth"]);
        } else {
          this.theSecurityservice.saveSession(data);
          this.router.navigate(["/dashboard"]); // Redirigir al dashboard si no se necesita segundo factor
        }
      },
      error: (error) => {
        if (error.status === 401) {
          Swal.fire("Error", "Usuario o Contraseña incorrectas", "error");
        }
      },
    });
  }

  verifyTwoFactorCode() {
    if (this.userId && this.twoFactorCode) {
      this.theSecurityservice
        .verifyTwoFactorCode(this.userId, this.twoFactorCode)
        .subscribe({
          next: (data: AuthResponse) => {
            this.theSecurityservice.saveSession(data);
            this.router.navigate(["/dashboard"]); // Redirigir al dashboard después de verificar el segundo factor
          },
          error: (error) => {
            Swal.fire("Error", "Código de verificación incorrecto", "error");
          },
        });
    }
  }
}
