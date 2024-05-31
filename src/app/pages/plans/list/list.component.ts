import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  plans: Plan[];
  constructor(private service: PlanService, private router: Router) {
    this.plans = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["plans/view/" + id]);
  }
  create() {
    this.router.navigate(["plans/create"]);
  }
  update(id: number) {
    this.router.navigate(["plans/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      this.plans = response.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Plan",
      text: "Está seguro que quiere eliminar el Plan?",
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
            "El Plan ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
