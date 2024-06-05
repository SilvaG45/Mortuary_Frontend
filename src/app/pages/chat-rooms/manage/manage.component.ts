import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ChatRoom } from "src/app/models/chat-room.model";
import { ChatRoomService } from "src/app/services/chat-room.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  chatRoom: ChatRoom;
  theFormGroup: FormGroup;
  trysend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: ChatRoomService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.chatRoom = {
      id: 0,
      service_execution_id: 0,
      holder_id: 0,
      name: "",
      code: "",
      status: 0,
    };
    this.configFormGroup();
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      service_execution_id: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required],
      ],
      holder_id: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required],
      ],
      name: [{ value: "", disabled: this.mode === 1 }, [Validators.required]],
      code: [{ value: "", disabled: this.mode === 1 }, [Validators.required]],
      status: [
        { value: 0, disabled: this.mode === 1 },
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
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
      this.chatRoom.id = this.activateRoute.snapshot.params.id;
      this.getchatRoom(this.chatRoom.id);
    }
    this.configFormGroup();
  }
  getchatRoom(id: number) {
    this.service.view(id).subscribe((data) => {
      this.chatRoom = data;
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
    this.service.create(this.chatRoom).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["chat-rooms/list"]);
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
    this.service.update(this.chatRoom).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["chat-rooms/list"]);
    });
  }
}
