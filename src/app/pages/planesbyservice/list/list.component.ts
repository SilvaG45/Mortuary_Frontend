import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { PlanByService } from "src/app/models/plan-by-service.model";
import { PlanByServiceService } from "src/app/services/planbyservice.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  planByService: PlanByService[];
  constructor(private service: PlanByServiceService, private router: Router) {
    this.planByService = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["planesByService/view/" + id]);
  }
  create() {
    this.router.navigate(["planesByService/create"]);
  }
  update(id: number) {
    this.router.navigate(["planesByService/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.planByService = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar plan por servicio",
      text: "Está seguro que quiere eliminar el plan por servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminada!",
            "El plan por servicio ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
