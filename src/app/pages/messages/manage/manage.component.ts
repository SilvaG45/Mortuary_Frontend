import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "src/app/models/message.model";
import { MessageService } from "src/app/services/message.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  message: Message;
  theFormGroup: FormGroup;
  trysend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: MessageService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.message = {
      id: 0,
      user_id: "",
      chat_room_id: 0,
      message: "",
      // date: new Date(),
      status: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: [
        {
          value: 0,
          disabled: this.mode == 1 || this.mode == 3,
        },
        [Validators.required],
      ],
      chat_room_id: [
        {
          value: 0,
          disabled: this.mode == 1 || this.mode == 3,
        },
        [Validators.required],
      ],
      message: [
        { value: "mensaje", disabled: this.mode == 1 },
        [Validators.required],
      ],
      // date: [
      //   { value: this.message.date, disabled: this.mode == 1 },
      //   [Validators.required],
      // ],
      status: [
        { value: 0, disabled: this.mode == 1 },
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
      this.message.id = this.activateRoute.snapshot.params.id;
      this.getmessage(this.message.id);
    }
    this.configFormGroup();
  }

  getmessage(id: number) {
    this.service.view(id).subscribe((response) => {
      this.message = response.data;
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
    this.message = { ...this.message, ...this.theFormGroup.value };
    this.service.create(this.message).subscribe(
      (data) => {
        Swal.fire(
          "Creación Exitosa",
          "Se ha creado un nuevo registro",
          "success"
        );
        this.router.navigate(["messages/list"]);
      },
      (error) => {
        console.error('Error al crear el mensaje:', error);
        Swal.fire(
          "Error en la creación",
          "Ha ocurrido un error al intentar crear el mensaje",
          "error"
        );
      }
    );
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
    this.message = { ...this.message, ...this.theFormGroup.value };
  
    this.service.update(this.message).subscribe(
      (data) => {
        Swal.fire(
          "Actualización Exitosa",
          "Se ha actualizado un nuevo registro",
          "success"
        );
        this.router.navigate(["messages/list"]);
      },
      (error) => {
        console.error('Error al actualizar el mensaje:', error);
        Swal.fire(
          "Error en la actualización",
          "Ha ocurrido un error al intentar actualizar el mensaje",
          "error"
        );
      }
    );
  }
  
}
