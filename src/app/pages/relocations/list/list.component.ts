import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Relocation } from "src/app/models/relocation.model";
import { RelocationService } from "src/app/services/relocation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  relocation: Relocation[];
  constructor(private service: RelocationService, private router: Router) {
    this.relocation = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["relocations/view/" + id]);
  }
  create() {
    this.router.navigate(["relocations/create"]);
  }
  update(id: number) {
    this.router.navigate(["relocations/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.relocation = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar traslado",
      text: "Está seguro que quiere eliminar el traslado?",
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
            "El traslado ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
