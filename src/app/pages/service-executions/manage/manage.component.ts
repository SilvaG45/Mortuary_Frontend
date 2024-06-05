import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceExecution } from "src/app/models/service-execution.model";
import { ServiceExecutionService } from "src/app/services/service-execution.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  serviceExecution: ServiceExecution;
  theFormGroup: FormGroup;
  trysend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: ServiceExecutionService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.serviceExecution = {
      id: 0,
      service_id: 0,
      customer_id: 0,
      driver_id: 0,
      room_id: 0,
      main_office: "",
      location: "",
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    const isDisabled = this.mode === 1;
    this.theFormGroup = this.theFormBuilder.group({
      service_id: [{ value: 0, disabled: isDisabled }, [Validators.required]],
      customer_id: [{ value: 0, disabled: isDisabled }, [Validators.required]],
      driver_id: [{ value: 0, disabled: isDisabled }, [Validators.required]],

      room_id: [{ value: 0, disabled: isDisabled }, [Validators.required]],

      main_office: [{ value: "", disabled: isDisabled }, [Validators.required]],
      location: [{ value: "", disabled: isDisabled }, [Validators.required]],
      status: [
        { value: 0, disabled: isDisabled },
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
      this.serviceExecution.id = this.activateRoute.snapshot.params.id;
      this.getBeneficiarie(this.serviceExecution.id);
    }
    this.configFormGroup(); // Reconfigura el formulario después de establecer el modo
  }

  getBeneficiarie(id: number) {
    this.service.view(id).subscribe((response) => {
      this.serviceExecution = response.data;
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
    this.service.create(this.serviceExecution).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["service-executions/list"]);
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
    this.service.update(this.serviceExecution).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["service-executions/list"]);
    });
  }
}
