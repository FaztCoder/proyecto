import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = [
    'position',
    'nombre',
    'apellidoP',
    'apellidoM',
    'telefono_1',
    'telefono_2',
    'acciones'
  ];

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 2, nombre: 'Erika', apellidoP: 'De la Zeta', apellidoM: 'Rodrigyez', telefono_1: '0987654321', telefono_2: '3021564896' },
    {position: 3, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 4, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 5, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 6, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 7, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 8, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 9, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
    {position: 10, nombre: 'Anthony', apellidoP: 'Solano', apellidoM: 'López', telefono_1: '123456789', telefono_2: '123456789' },
  ];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
