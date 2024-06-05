import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
// import { Headquarter } from "src/app/models/headquarter.model";
import { Administrator } from "src/app/models/administrator.model";
import { HeadquarterService } from "src/app/services/headquarter.service";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  administrator: Administrator;
  theFormGroup: FormGroup;
  trySend: boolean;
  // headquarter: Headquarter[];
  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: AdministratorService,
    private router: Router,
    // private headquarterService: HeadquarterService
  ) {
    this.trySend = false;
    this.mode = 1;
    // this.headquarter = [];
    this.administrator = {
      id: 0,
      user_id: "",
      responsabilities: "",
      status: 1,
    };
    // this.headquarterList();
    this.configFormGroup();
  }

  // headquarterList() {
  //   this.headquarterService.list().subscribe((data) => {
  //     this.headquarter = data;
  //   });
  // }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: [0,[Validators.required],],
      responsabilities: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      status: ["", [Validators.required, Validators.minLength(2)]],
      // idHeadquarter: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getAdministratorData(){
  //  this.administrator.capacity = this.getTheFormGroup.capacity.value;
  //  this.administrator.location = this.getTheFormGroup.location.value;
  //}

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
      console.log("Administrador" + JSON.stringify(this.administrator));
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario Incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
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
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario Incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.update(this.administrator).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",  
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["administrators/list"]);
    });
  }
}
