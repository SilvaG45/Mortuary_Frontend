import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommentsAndRating } from "src/app/models/comments-and-rating.model";
import { CommentsAndRatingService } from "src/app/services/comments-and-rating.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  commentsAndRating: CommentsAndRating[];
  constructor(
    private service: CommentsAndRatingService,
    private router: Router
  ) {
    this.commentsAndRating = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["comments-and-ratings/view/" + id]);
  }
  create() {
    this.router.navigate(["comments-and-ratings/create"]);
  }
  serviceExecutions() {
    this.router.navigate(["service-executions/list"]);
  }
  customers() {
    this.router.navigate(["customers/list"]);
  }
  update(id: number) {
    this.router.navigate(["comments-and-ratings/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.commentsAndRating = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Comentario",
      text: "Está seguro que quiere eliminar el Comentario?",
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
            "El Comentario ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
