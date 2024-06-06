import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  administrators: Administrator[];
  constructor(private service: AdministratorService, private router: Router) {
    this.administrators = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["administrators/view/" + id]);
  }
  create() {
    this.router.navigate(["administrators/create"]);
  }
  update(id: number) {
    this.router.navigate(["administrators/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      this.administrators = response.data.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar administrador",
      text: "Está seguro que quiere eliminar el administrador?",
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
            "El administrador ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
