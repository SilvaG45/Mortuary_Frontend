import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Headquarter } from "src/app/models/headquarter.model";
import { Burial } from "src/app/models/burial.model";
import { BurialService } from "src/app/services/burial.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  burial: Burial;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: BurialService,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.burial = {
      id: 0,
      service_id: 0,
      room_id: 0,
      description: "",
      location: "",
      status: 1,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      service_id: [0, [Validators.required]],
      room_id: [0, [Validators.required]],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(120),
        ],
      ],
      location: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      status: [0, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getburialData(){
  //  this.burial.capacity = this.getTheFormGroup.capacity.value;
  //  this.burial.location = this.getTheFormGroup.location.value;
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
      this.burial.id = this.activateRoute.snapshot.params.id;
      this.getBurial(this.burial.id);
    }
  }

  getBurial(id: number) {
    this.service.view(id).subscribe((data) => {
      this.burial = data;
      console.log("Entierro: " + JSON.stringify(this.burial));
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
    this.burial = { ...this.burial, ...this.theFormGroup.value };
    this.service.create(this.burial).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["burials/list"]);
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
  
    this.service.update(this.burial).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["burials/list"]);
    });
  }
}
