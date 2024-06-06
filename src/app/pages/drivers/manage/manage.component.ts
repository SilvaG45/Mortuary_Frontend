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
      user_id: [
        { value: "", disabled: this.mode === 1 },

        [Validators.required],
      ],
      name: [
        { value: "", disabled: this.mode === 1 },

        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      vehicle: [
        { value: "", disabled: this.mode === 1 },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      model: [
        { value: "", disabled: this.mode === 1 },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      phone_number: [
        { value: "", disabled: this.mode === 1 },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      capacity: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      status: [{ value: 0, disabled: this.mode === 1 }, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

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
      this.driver.id = +this.activateRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    } else {
      this.updateFormState();
    }
  }

  getDriver(id: number) {
    this.service.view(id).subscribe((response) => {
      this.driver = response.data;
      this.theFormGroup.patchValue(this.driver);
      this.updateFormState();
    });
  }

  updateFormState() {
    if (this.mode === 1) {
      this.theFormGroup.disable();
    } else {
      this.theFormGroup.enable();
      if (this.mode === 3) {
        this.theFormGroup.get("user_id").disable();
      }
    }
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
    this.driver = { ...this.driver, ...this.theFormGroup.value };

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
    this.driver = { ...this.driver, ...this.theFormGroup.value };

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
