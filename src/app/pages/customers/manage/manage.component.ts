import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  customer: Customer;
  theFormGroup: FormGroup;
  trysend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: CustomerService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.customer = {
      id: 0,
      user_id: "",
      status: 0,
      // holders: [],
      // beneficiaries: [],
      // plans: [],
      // services: [],
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: [
        { value: "", disabled: this.mode === 1 },
        [Validators.required],
      ],
      status: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      // holders: [[], []],
      // beneficiaries: [[], []],
      // plans: [[], []],
      // services: [[], []],
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
      this.customer.id = this.activateRoute.snapshot.params.id;
      this.getCustomer(this.customer.id);
    } else {
      this.updateFormState();
    }
  }

  getCustomer(id: number) {
    this.service.view(id).subscribe((response) => {
      this.customer = response.data;
      this.theFormGroup.patchValue(this.customer);
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
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.customer = { ...this.customer, ...this.theFormGroup.value };
    this.service.create(this.customer).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["customers/list"]);
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
    this.customer = { ...this.customer, ...this.theFormGroup.value };
    this.service.update(this.customer).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["customers/list"]);
    });
  }
}
