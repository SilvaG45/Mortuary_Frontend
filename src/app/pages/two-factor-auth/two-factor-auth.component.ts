import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SecurityService } from "../../services/security.service";
import Swal from "sweetalert2";
import { tap, catchError } from "rxjs/operators";

@Component({
  selector: "app-two-factor-auth",
  templateUrl: "./two-factor-auth.component.html",
  styleUrls: ["./two-factor-auth.component.scss"],
})
export class TwoFactorAuthComponent {
  code: number;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  verifyCode() {
    const userId = this.securityService.activeUserSession?._id;
    if (userId) {
      this.securityService.verifyTwoFactorCode(userId, this.code)
        .pipe(
          tap((response) => {
            if (response.token) {
              this.securityService.saveSession(response);
              this.router.navigate(["/dashboard"]);
            } else {
              Swal.fire("Código de autenticación incorrecto", "", "error");
            }
          }),
          catchError((error) => {
            Swal.fire("Error al verificar el código de autenticación", "", "error");
            throw error; // Propagar el error para manejarlo más arriba si es necesario
          })
        )
        .subscribe();
    } else {
      Swal.fire("Error de autenticación", "Usuario no autenticado", "error");
      this.router.navigate(["/login"]); // Redirigir a la página de inicio de sesión si no hay userId
    }
  }
}
