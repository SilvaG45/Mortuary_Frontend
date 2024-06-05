import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "src/app/models/message.model";
import { MessageService } from "src/app/services/message.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  messages: Message[];
  constructor(private service: MessageService, private router: Router) {
    this.messages = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["messages/view/" + id]);
  }
  create() {
    this.router.navigate(["messages/create"]);
  }
  update(id: number) {
    this.router.navigate(["messages/update/" + id]);
  }
  list() {
    this.service.list().subscribe((response) => {
      console.log(JSON.stringify(response.data));
      this.messages = response.data.data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Mensaje",
      text: "Está seguro que quiere eliminar el Mensaje?",
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
            "El Mensaje ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
