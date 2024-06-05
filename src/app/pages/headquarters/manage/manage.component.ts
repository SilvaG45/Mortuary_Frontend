import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Headquarter } from "src/app/models/headquarter.model";
import { HeadquarterService } from "src/app/services/headquarter.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  headquarter: Headquarter;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: HeadquarterService,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.headquarter = {
      id: 0,
      administrator_id: 0,
      name: "",
      description: "",
      capacity: 0,
      city_id: 0,
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      administrator_id: [0, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      capacity: [
        "",
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(100),
        ],
      ],
      city_id: [0, [Validators.required]],
      status: ["", [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getHeadquarterData(){
  //  this.Headquarter.capacity = this.getTheFormGroup.capacity.value;
  //  this.Headquarter.location = this.getTheFormGroup.location.value;
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
      this.headquarter.id = this.activateRoute.snapshot.params.id;
      this.getHeadquarter(this.headquarter.id);
    }
  }

  getHeadquarter(id: number) {
    this.service.view(id).subscribe((data) => {
      this.headquarter = data;
      console.log("Headquarter " + JSON.stringify(this.headquarter));
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
    this.service.create(this.headquarter).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["headquarters/list"]);
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
    this.service.update(this.headquarter).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["headquarters/list"]);
    });
  }
}
