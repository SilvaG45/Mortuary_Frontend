import { Router } from "@adonisjs/core/build/modules/http/main";
import { Component, OnInit } from "@angular/core";
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

  list() {
    this.service.list().subscribe((data) => {
      this.cities = data;
      console.log(JSON.stringify(this.cities));
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
            "Eliminado!",
            "La ciudad ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
