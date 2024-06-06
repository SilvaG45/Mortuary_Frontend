import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Headquarter } from "src/app/models/headquarter.model";
import { HeadquarterService } from "src/app/services/headquarter.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  headquarters: Headquarter[];
  constructor(private service: HeadquarterService, private router: Router) {
    this.headquarters = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["headquarters/view/" + id]);
  }
  create() {
    this.router.navigate(["headquarters/create"]);
  }
  update(id: number) {
    this.router.navigate(["headquarters/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {

      // console.log(JSON.stringify(data));
       this.headquarters = data;
      
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar sede",
      text: "Está seguro que quiere eliminar la sede?",
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
            "La sede ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
