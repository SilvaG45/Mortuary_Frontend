import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Department } from "src/app/models/department.model";
import { DepartmentService } from "src/app/services/department.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  departments: Department[];
  constructor(private service: DepartmentService, private router: Router) {
    this.departments = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["departments/view/" + id]);
  }
  create() {
    this.router.navigate(["departments/create"]);
  }
  update(id: number) {
    this.router.navigate(["departments/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.departments = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar departamento",
      text: "Está seguro que quiere eliminar el departamento?",
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
            "El departamento ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
