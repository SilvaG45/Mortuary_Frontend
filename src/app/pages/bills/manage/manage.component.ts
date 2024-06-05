import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Headquarter } from "src/app/models/headquarter.model";
import { Bill } from "src/app/models/bill.model";
import { HeadquarterService } from "src/app/services/headquarter.service";
import { BillService } from "src/app/services/bill.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  bill: Bill;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: BillService,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.bill = {
      id: 0,
      customer_id: 0,
      membership_id: "",
      price: 0,
      status: false,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      customer_id: [0,
         [
        Validators.required
      ]
    ],
      membership_id: ["",
       [Validators.required]
      ],
      price: ["", 
      [Validators.required, Validators.minLength(10000), Validators.maxLength(1000000)]
    ],
      status: ["",
       [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //getBillData(){
  //  this.bill.capacity = this.getTheFormGroup.capacity.value;
  //  this.bill.location = this.getTheFormGroup.location.value;
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
      this.bill.id = this.activateRoute.snapshot.params.id;
      this.getBill(this.bill.id);
    }
  }

  getBill(id: number) {
    this.service.view(id).subscribe((data) => {
      this.bill = data;
      console.log("Pago: " + JSON.stringify(this.bill));
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
    this.service.create(this.bill).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["bills/list"]);
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
    this.service.update(this.bill).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado el registro",
        "success"
      );
      this.router.navigate(["bills/list"]);
    });
  }
}
