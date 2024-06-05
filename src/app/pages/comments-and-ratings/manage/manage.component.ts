import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentsAndRating } from "src/app/models/comments-and-rating.model";
import { CommentsAndRatingService } from "src/app/services/comments-and-rating.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  commentsAndRatings: CommentsAndRating;
  theFormGroup: FormGroup;
  trysend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: CommentsAndRatingService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.commentsAndRatings = {
      id: 0,
      service_execution_id: 0,
      customer_id: 0,
      description: "",
      rating: 0,
    };
    this.configFormGroup();
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      service_execution_id: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required],
      ],
      customer_id: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required],
      ],
      description: [
        { value: "", disabled: this.mode === 1 },
        [Validators.required],
      ],
      rating: [{ value: 0, disabled: this.mode === 1 }, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.commentsAndRatings.id = this.activateRoute.snapshot.params.id;
      this.getCommentsAndRatings(this.commentsAndRatings.id);
    }
    this.configFormGroup();
  }
  getCommentsAndRatings(id: number) {
    this.service.view(id).subscribe((data) => {
      this.commentsAndRatings = data;
    });
  }
  create() {
    if (this.theFormGroup.invalid) {
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.create(this.commentsAndRatings).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["comments-and-ratings/list"]);
    });
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.update(this.commentsAndRatings).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["comments-and-ratings/list"]);
    });
  }
}
