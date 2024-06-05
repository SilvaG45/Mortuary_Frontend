import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  driver: Driver;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: DriverService,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.driver = {
      id: 0,
      user_id: "",
      name: "",
      vehicle: "",
      model: "",
      phone_number: "",
      capacity: 0,
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: [0, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      vehicle: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      model: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      phone_number: [
        "",
        [Validators.required, Validators.minLength(8), Validators.maxLength(10)],
      ],
      capacity: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      status: ["", [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getDriverData(){
  //  this.driver.capacity = this.getTheFormGroup.capacity.value;
  //  this.driver.location = this.getTheFormGroup.location.value;
  //}

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.driver.id = this.activateRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    }
  }

  getDriver(id: number) {
    this.service.view(id).subscribe((data) => {
      this.driver = data;
      console.log("Driver " + JSON.stringify(this.driver));
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario Incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.create(this.driver).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["drivers/list"]);
    });
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario Incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.update(this.driver).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["drivers/list"]);
    });
  }
}
