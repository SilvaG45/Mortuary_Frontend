import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import Swal from "sweetalert2";
import { AuthResponse } from "src/app/models/auth-response.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  newUser: User;

  constructor(
    private theSecurityservice: SecurityService,
    private router: Router
  ) {
    this.newUser = {
      name: "",
      email: "",
      password: "",
    };
  }

  ngOnInit() {}

  register() {
    this.theSecurityservice.register(this.newUser).subscribe({
      next: (data: AuthResponse) => {
        Swal.fire("Success", "Cuenta creada correctamente", "success");
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        if (error.status === 400) {
          Swal.fire(
            "Error",
            "Email ya está en uso, o información no válida",
            "error"
          );
        }
      },
    });
  }
}
