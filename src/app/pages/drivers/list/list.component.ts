import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  drivers: Driver[];
  constructor(private service: DriverService, private router: Router) {
    this.drivers = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["drivers/view/" + id]);
  }
  create() {
    this.router.navigate(["drivers/create"]);
  }
  update(id: number) {
    this.router.navigate(["drivers/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.drivers = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Estudiante",
      text: "Está seguro que quiere eliminar el estudiante?",
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
            "El estudiante ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
