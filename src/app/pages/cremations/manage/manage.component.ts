import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cremation } from "src/app/models/cremation.model";
import { CremationService } from "src/app/services/cremation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  cremation: Cremation;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: CremationService,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.cremation = {
      id: 0,
      service_id: "",
      room_id: "",
      cremation_date: new Date(),
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      service_id: [0, [Validators.required]],
      room_id: [0, [Validators.required]],
      cremation_date: ["", [Validators.required]],
      status: [0, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getCremationData(){
  //  this.cremation.capacity = this.getTheFormGroup.capacity.value;
  //  this.cremation.location = this.getTheFormGroup.location.value;
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
      this.cremation.id = this.activateRoute.snapshot.params.id;
      this.getCremation(this.cremation.id);
    }
  }

  getCremation(id: number) {
    this.service.view(id).subscribe((data) => {
      this.cremation = data;
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
    this.cremation = { ...this.cremation, ...this.theFormGroup.value };
    this.service.create(this.cremation).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["cremations/list"]);
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
    this.service.update(this.cremation).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["cremations/list"]);
    });
  }
}
