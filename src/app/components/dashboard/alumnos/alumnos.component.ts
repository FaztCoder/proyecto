import { Component, OnInit, ViewChild } from '@angular/core';

// Datatable
import { HttpClient } from '@angular/common/http';


// Modelos
import { AlumnoModel } from 'src/app/Models/AlumnoModel';

import { Observable, Subject } from 'rxjs';


export interface PeriodicElement {
  position: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  telefono_1: string;
  telefono_2: string;
}
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  alumnos: AlumnoModel[] = [];

  dtTrigger: Subject<any> = new Subject();


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.httpClient.get<AlumnoModel[]>('http://localhost:8080/api/alumnos').subscribe(
      (data) => {
        if (data != null) {
          this.alumnos = data;
          this.dtTrigger.next(0);
        } else {
          alert('No hay datos');
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
