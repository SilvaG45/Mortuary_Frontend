import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  customers: Customer[];
  constructor(private service: CustomerService, private router: Router) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["customers/view/" + id]);
  }
  create() {
    this.router.navigate(["customers/create"]);
  }
  update(id: number) {
    this.router.navigate(["customers/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      this.customers = response.data.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "Está seguro que quiere eliminar el Cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El Cliente ha sido eliminado correctamente",
            "success"
          );
          console.log(data);
          this.ngOnInit();
        });
      }
    });
  }
}
