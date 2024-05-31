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
  bills: Bill[];
  constructor(private service: BillService, private router: Router) {
    this.bills = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.bills = data;
      console.log(JSON.stringify(this.bills));
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar pago",
      text: "Está seguro que quiere eliminar el pago?",
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
            "El pago ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
