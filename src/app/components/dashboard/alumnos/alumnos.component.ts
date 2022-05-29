import { AfterViewInit, Component, OnInit } from '@angular/core';
// Modelos
import { AlumnoModel } from 'src/app/Models/AlumnoModel';
// Servicios
import { Subject } from 'rxjs';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
// Import de SwweetAlert2
import Swal from 'sweetalert2';
// Reactive forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent implements OnInit, AfterViewInit {
  form;
  alumnos: any;
  // Datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // Constructor
  constructor(
    private as: AlumnosService,
    private fb: FormBuilder
    ) { 
      this.form = fb.group({
        nombre_alumno: ['', Validators.required],
        apellido_p: ['', Validators.required],
        apellido_m: ['', Validators.required],
        telefono_1: ['', Validators.required],
        telefono_2: ['', Validators.required]
      });
    }
  // Ciclo de vida del componente
  ngOnInit(): void {
 this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
};
    this.getAlumnos();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(0);
  }
  // Metodo para agregar un alumno
  agregarAlumno(){
    // formulario de sweetalert
    Swal.fire({
      title: 'Agregar Alumno',
      text: "Seguro quieres agregar un alumno?",
      html:
        '<form id="contactForm" [formGroup]="form" (ngSubmit)="agregarAlumno()">'+
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre" required formControlName="nombre_alumno">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Apellido Paterno" required formControlName="apellido_p">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Apellido Materno" required formControlName="apellido_m">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Telefono 1" required formControlName="telefono_1">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Telefono 2" required telefono_2>' +
        '</form>',
      focusConfirm: false,
    })
  }
  // Metodo para obtener los alumnos
  getAlumnos(){
    this.as.getAlumnos().subscribe(
      (data)=>{
        this.alumnos = data;
        // this.dtTrigger.next(0);
        console.log(data);
      });
    }
  // Metodo para editar un alumno
  editarAlumno(alumno : any){
    this.as.getAlumboByID(alumno.id_alumno).subscribe(
      (data)=>{
        console.log(data)
    Swal.fire({
      title: 'Editar Alumno',
      text: "Seguro quieres editar el alumno?",
      html:
      `<div class="form-group">
        <label for="id_alumno" hidden="hidden">ID Alumno</label>
        <input hidden="hidden" disabled type="text" class="form-control text-capitalize" id="nombre_alumno" value="${alumno.id_alumno}">
      </div>
      <div class="form-group">
        <label for="apellido_p">Nombre Alumno</label>
        <input type="text" class="form-control text-capitalize" id="apellido_p" value="${alumno.nombre_alumno}">
      <div class="form-group">
        <label for="apellido_p">Apellido Paterno</label>
        <input type="text" class="form-control text-capitalize" id="apellido_p" value="${alumno.apellido_p}">
      </div>
      <div class="form-group">
        <label for="apellido_m">Apellido Materno</label>
        <input type="text" class="form-control text-capitalize" id="apellido_m" value="${alumno.apellido_m}">
      </div>
      <div class="form-group">
        <label for="telefono_1">Telefono 1</label>
        <input type="text" class="form-control text-capitalize" id="telefono_1" value="${alumno.telefono_1}">
      </div>
      <div class="form-group">
        <label for="telefono_2">Telefono 2</label>
        <input type="text" class="form-control text-capitalize" id="telefono_1" value="${alumno.telefono_2}">
      </div>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, editar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        console.log(data);
        // lo que traiga el value del swal es lo que se va a editar en la base de datos
        this.as.editarAlumno(alumno).subscribe(
          (data)=>{
            console.log(data);
            this.getAlumnos();
          }
        )
      }
    }) // fin del then
  }); // fin del subscribe de la peticion get
  } // fin del metodo editarAlumno

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
function alumno(alumno: any) {
  throw new Error('Function not implemented.');
}

