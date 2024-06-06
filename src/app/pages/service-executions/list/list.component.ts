import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceExecution } from "src/app/models/service-execution.model";
import { ServiceExecutionService } from "src/app/services/service-execution.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  serviceExecution: ServiceExecution[];
  constructor(
    private service: ServiceExecutionService,
    private router: Router
  ) {
    this.serviceExecution = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["service-executions/view/" + id]);
  }
  create() {
    this.router.navigate(["service-executions/create"]);
  }
  services() {
    this.router.navigate(["services/list"]);
  }
  customers() {
    this.router.navigate(["customers/list"]);
  }
  drivers() {
    this.router.navigate(["drivers/list"]);
  }
  update(id: number) {
    this.router.navigate(["service-executions/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      console.log(JSON.stringify(response));
      this.serviceExecution = response.data.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Servicio en Ejecución",
      text: "Está seguro que quiere eliminar el Servicio en Ejecución?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El Servicio en Ejecución ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
