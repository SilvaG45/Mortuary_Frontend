import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Membership } from "src/app/models/membership.model";
import { MembershipService } from "src/app/services/membership.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  membership: Membership;
  theFormGroup: FormGroup;
  trysend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: MembershipService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.membership = {
      id: 0,
      name: "",
      customer_id: 0,
      plan_id: 0,
      status: 0,
    };
    this.configFormGroup();
  }
  configFormGroup() {
    const isDisabled = this.mode === 1;
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        { value: "", disabled: isDisabled },
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      customer_id: [
        { value: 0, disabled: isDisabled },
        [Validators.required]
      ],
      plan_id: [
        { value: 0, disabled: isDisabled },
        [Validators.required]
      ],
      status: [
        { value: 0, disabled: isDisabled },
        [Validators.required, Validators.min(0), Validators.max(1)]
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
      this.membership.id = this.activateRoute.snapshot.params.id;
      this.getMembership(this.membership.id);
    }
    this.configFormGroup(); // Reconfigura el formulario después de establecer el modo
  }
  getMembership(id: number) {
    this.service.view(id).subscribe((response) => {
      this.membership = response.data;
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
    this.service.create(this.membership).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["memberships/list"]);
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
    this.service.update(this.membership).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["memberships/list"]);
    });
  }
}
