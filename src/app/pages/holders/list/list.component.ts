import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Holder } from "src/app/models/holder.model";
import { HolderService } from "src/app/services/holder.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  holder: Holder[];
  constructor(private service: HolderService, private router: Router) {
    this.holder = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["holders/view/" + id]);
  }
  create() {
    this.router.navigate(["holders/create"]);
  }
  customers() {
    this.router.navigate(["customers/list"]);
  }
  update(id: number) {
    this.router.navigate(["holders/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      this.holder = response.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Titular",
      text: "Está seguro que quiere eliminar el Titular?",
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
            "El Titular ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
