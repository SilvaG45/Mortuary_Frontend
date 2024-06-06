import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Bill } from "src/app/models/bill.model";
import { BillService } from "src/app/services/bill.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  bills: Bill[] = []; // Declara e inicializa la propiedad bills como un array vacío de Bill

  constructor(private service: BillService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["bills/view/" + id]);
  }

  create() {
    this.router.navigate(["bills/create"]);
  }

  update(id: number) {
    this.router.navigate(["bills/update/" + id]);
  }

  list() {
    this.service.list().subscribe((data) => {
      this.bills = data; 
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar pago",
      text: "¿Está seguro que quiere eliminar el pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado",
            "El pago ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
