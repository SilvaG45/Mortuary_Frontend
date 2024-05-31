import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Beneficiarie } from "src/app/models/beneficiarie.model";
import { BeneficiarieService } from "src/app/services/beneficiarie.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  beneficiarie: Beneficiarie[];
  constructor(private service: BeneficiarieService, private router: Router) {
    this.beneficiarie = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["beneficiaries/view/" + id]);
  }
  create() {
    this.router.navigate(["beneficiaries/create"]);
  }
  update(id: number) {
    this.router.navigate(["beneficiaries/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      this.beneficiarie = response.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Beneficiario",
      text: "Está seguro que quiere eliminar el Beneficiario?",
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
            "El Beneficiario ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
