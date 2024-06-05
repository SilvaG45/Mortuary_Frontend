import { Router } from "@adonisjs/core/build/modules/http/main";
import { Component, OnInit } from "@angular/core";
import { PlanByService } from "src/app/models/plan-by-service.model";
import { PlanByServiceService } from "src/app/services/planbyservice.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  planesbyservice: PlanByService[];
  constructor(private service: PlanByServiceService, private router: Router) {
    this.planesbyservice = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.planesbyservice = data;
      console.log(JSON.stringify(this.planesbyservice));
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
            "Eliminado!",
            "El plan por servicio ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
