import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Beneficiarie } from "src/app/models/beneficiarie.model";
import { BeneficiarieService } from "src/app/services/beneficiarie.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  beneficiarie: Beneficiarie;
  theFormGroup: FormGroup;
  trysend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: BeneficiarieService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.beneficiarie = {
      id: 0,
      customer_id: 0,
      holder_id: 0,
      isprincipal_beneficiarie: false,
      is_emergy_contact: false,
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      customer_id: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required],
      ],
      holder_id: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required],
      ],
      isprincipal_beneficiarie: [
        { value: false, disabled: this.mode === 1 },
        [Validators.required],
      ],
      is_emergy_contact: [
        { value: false, disabled: this.mode === 1 },
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
      this.beneficiarie.id = this.activateRoute.snapshot.params.id;
      this.getBeneficiarie(this.beneficiarie.id);
    }
    this.configFormGroup();
  }

  getBeneficiarie(id: number) {
    this.service.view(id).subscribe((response) => {
      this.beneficiarie = response.data;
    });
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
    this.beneficiarie = { ...this.beneficiarie, ...this.theFormGroup.value };
    this.service.create(this.beneficiarie).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["beneficiaries/list"]);
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
    this.beneficiarie = { ...this.beneficiarie, ...this.theFormGroup.value };
    this.service.update(this.beneficiarie).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["beneficiaries/list"]);
    });
  }
}
