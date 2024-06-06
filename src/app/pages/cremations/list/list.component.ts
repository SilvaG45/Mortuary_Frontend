import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Cremation } from "src/app/models/cremation.model";
import { CremationService } from "src/app/services/cremation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  cremation: Cremation[];
  constructor(private service: CremationService, private router: Router) {
    this.cremation = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["cremations/view/" + id]);
  }
  create() {
    this.router.navigate(["cremations/create"]);
  }
  update(id: number) {
    this.router.navigate(["cremations/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.cremation = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar cremación",
      text: "Está seguro que quiere eliminar la cremación?",
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
            "La cremación ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
