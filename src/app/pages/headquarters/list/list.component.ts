import { Router } from '@adonisjs/core/build/modules/http/main';
import { Component, OnInit } from '@angular/core';
import { Headquarter } from 'src/app/models/headquarter.model';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headquarters:Headquarter[]
  constructor(private service:HeadquarterService, private router:Router) {
    this.headquarters=[]
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data=> {
      this.headquarters=data
      console.log(JSON.stringify(this.headquarters))
    })
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar sede",
      text: "Está seguro que quiere eliminar la sede?",
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
            "La sede ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
