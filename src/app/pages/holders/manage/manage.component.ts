import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Holder } from "src/app/models/holder.model";
import { HolderService } from "src/app/services/holder.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  holder: Holder;
  theFormGroup: FormGroup;
  trysend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: HolderService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.holder = {
      id: 0,
      customer_id: 0,
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      customer_id: [
        { value: 0, disabled: this.mode === (1||3) },
        [Validators.required],
      ],
      status: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
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
      this.holder.id = this.activateRoute.snapshot.params.id;
      this.getHolder(this.holder.id);
    } else {
      this.updateFormState();
    }
  }

  getHolder(id: number) {
    this.service.view(id).subscribe((response) => {
      this.holder = response.data;
      this.theFormGroup.patchValue(this.holder);
      this.updateFormState();
    });
  }

  updateFormState() {
    if (this.mode === 1) {
      this.theFormGroup.disable();
    } else {
      this.theFormGroup.enable();
      if (this.mode === 3) {
        this.theFormGroup.get("customer_id");
      }
    }
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.holder = { ...this.holder, ...this.theFormGroup.value };
    this.service.create(this.holder).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["holders/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.holder = { ...this.holder, ...this.theFormGroup.value };
    this.service.update(this.holder).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["holders/list"]);
    });
  }
}
