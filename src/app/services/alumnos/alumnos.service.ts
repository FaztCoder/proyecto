import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// const url = environment.url_api;


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  url  : string = 'http://localhost:8080';
  // headers
  headersT = new HttpHeaders();

  constructor(private http: HttpClient,
              private coockieService: CookieService) { 
                const token = this.coockieService.get('token');
                this.headersT =  this.headersT.append('Authorization', 'Bearer ' + token);
              }
  // Obtener todos los alumnos
  getAlumnos() {
    return this.http.get(this.url+'/api/alumnos' , {headers: this.headersT});
  }
  // Obtenemos un alumno por su id
  getAlumboByID(id_alumno: any) {
    return this.http.get(this.url+'/api/alumnos/'+id_alumno , {headers: this.headersT});
  }
  // Editamos un alumno
  editarAlumno(alumno: any): Observable<any> {
    return this.http.put(this.url+'/api/alumnos/edit/'+alumno.id_alumno , alumno, {headers: this.headersT});
  }
  // Agregamos un alumno
  agregarAlumno(alumno: any): Observable<any> {
    return this.http.post(this.url+'/api/alumnos/create', alumno, {headers: this.headersT});
  }
}
