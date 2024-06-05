import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Burial } from "src/app/models/burial.model";
import { BurialService } from "src/app/services/burial.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  burial: Burial[];
  constructor(private service: BurialService, private router: Router) {
    this.burial = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["burial/view/" + id]);
  }
  create() {
    this.router.navigate(["burial/create"]);
  }
  update(id: number) {
    this.router.navigate(["burial/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.burial = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar entierro",
      text: "Está seguro que quiere eliminar el entierro?",
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
            "El entierro ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
