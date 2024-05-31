import { Router } from "@adonisjs/core/build/modules/http/main";
import { Component, OnInit } from "@angular/core";
import { Room } from "src/app/models/room.model";
import { RoomService } from "src/app/services/room.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  rooms: Room[];
  constructor(private service: RoomService, private router: Router) {
    this.rooms = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.rooms = data;
      console.log(JSON.stringify(this.rooms));
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar sala",
      text: "Está seguro que quiere eliminar la sala?",
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
            "La sala ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
