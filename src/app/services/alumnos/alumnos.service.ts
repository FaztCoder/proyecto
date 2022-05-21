import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // headers
  headersT = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAlumnos() {
    return this.http.get(`${url}/api/alumnos`, { headers: this.headersT });
  }
}
