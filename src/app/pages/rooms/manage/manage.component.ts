import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "src/app/models/room.model";
import { RoomService } from "src/app/services/room.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  room: Room;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: RoomService,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.room = {
      id: 0,
      name: "",
      description: "",
      capacity: 0,
      headquarter_id: 0,
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      capacity: [
        0,
        [
          Validators.required,
          Validators.min(10),
          Validators.max(30),
        ],
      ],
      headquarter_id: [0, [Validators.required]],
      status: [0, [Validators.required]],
    });
    
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getRoomData(){
  //  this.room.capacity = this.getTheFormGroup.capacity.value;
  //  this.room.location = this.getTheFormGroup.location.value;
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
      this.room.id = this.activateRoute.snapshot.params.id;
      this.getRoom(this.room.id);
    }
    this.configFormGroup()
  }

  getRoom(id: number) {
    this.service.view(id).subscribe((data) => {
      this.room = data;
      console.log("Room " + JSON.stringify(this.room));
    });
  }

  create() {
    console.log(this.theFormGroup)
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario Incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.create(this.room).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["rooms/list"]);
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
    this.service.update(this.room).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["rooms/list"]);
    });
  }
}
