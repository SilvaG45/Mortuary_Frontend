import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  administrator: Administrator;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: AdministratorService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.trySend = false;
    this.mode = 1;
    // this.administrator = {
    //   id: 0,
    //   // projector: {
    //   //   id: 0, // vamos a jugar con el projector, mediante el id
    //   // },
    // };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      capacity: [0, [Validators.min(1), Validators.max(100)]],
      location: ["", [Validators.required, Validators.minLength(2)]],
      idProjector: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //   getAdministratorData(){
  //     this.administrator.capacity = this.getTheFormGroup.capacity.value;
  //     this.administrator.location = this.getTheFormGroup.location.value;
  //   }
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
      this.administrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.administrator.id);
    }
  }
  getAdministrator(id: number) {
    this.service.view(id).subscribe((data) => {
      this.administrator = data;
    });
  }
  create() {
    this.service.create(this.administrator).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["administrators/list"]);
    });
  }
  update() {
    this.service.update(this.administrator).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["theaters/list"]);
    });
  }
}
