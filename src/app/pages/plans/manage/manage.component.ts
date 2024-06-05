import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  plan: Plan;
  theFormGroup: FormGroup;
  trysend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: PlanService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.plan = {
      id: 0,
      name: "",
      description: "",
      number_of_beneficiaries: 0,
      price: 100000,
      discount: 0,
    };
    this.configFormGroup();
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
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
          Validators.maxLength(30),
        ],
      ],
      number_of_beneficiaries: [
        0,
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      price: [
        100000,
        [Validators.required, Validators.min(100000), Validators.max(1000000)],
      ],
      discount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
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
      this.plan.id = this.activateRoute.snapshot.params.id;
      this.getPlan(this.plan.id);
    }
  }
  getPlan(id: number) {
    this.service.view(id).subscribe((data) => {
      this.plan = data.data;
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
    this.service.create(this.plan).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["plans/list"]);
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
    this.service.update(this.plan).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["plans/list"]);
    });
  }
}
