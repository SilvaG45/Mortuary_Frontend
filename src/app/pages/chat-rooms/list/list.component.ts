import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChatRoom } from "src/app/models/chat-room.model";
import { ChatRoomService } from "src/app/services/chat-room.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  chatRooms: ChatRoom[];
  constructor(private service: ChatRoomService, private router: Router) {
    this.chatRooms = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["chat-rooms/view/" + id]);
  }
  create() {
    this.router.navigate(["chat-rooms/create"]);
  }
  update(id: number) {
    this.router.navigate(["chat-rooms/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.chatRooms = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar ChatRoom",
      text: "Está seguro que quiere eliminar el ChatRoom?",
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
            "El ChatRoom ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
