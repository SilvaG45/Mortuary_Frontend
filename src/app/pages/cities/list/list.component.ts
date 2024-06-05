import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { City } from "src/app/models/city.model";
import { CityService } from "src/app/services/city.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  cities: City[];
  constructor(private service: CityService, private router: Router) {
    this.cities = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["cities/view/" + id]);
  }
  create() {
    this.router.navigate(["cities/create"]);
  }
  update(id: number) {
    this.router.navigate(["cities/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.cities = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar ciudad",
      text: "Está seguro que quiere eliminar la ciudad?",
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
            "La ciudad ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
