import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Membership } from "src/app/models/membership.model";
import { MembershipService } from "src/app/services/membership.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  membership: Membership[];
  constructor(private service: MembershipService, private router: Router) {
    this.membership = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["memberships/view/" + id]);
  }
  create() {
    this.router.navigate(["memberships/create"]);
  }
  customers() {
    this.router.navigate(["customers/list"]);
  }
  plans() {
    this.router.navigate(["plans/list"]);
  }
  update(id: number) {
    this.router.navigate(["memberships/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      this.membership = response.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Membresía",
      text: "Está seguro que quiere eliminar el Membresía?",
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
            "El Membresía ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
