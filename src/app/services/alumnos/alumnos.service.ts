import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  constructor() { }

  getAlumnos() {
    return fetch(`${url}/api/alumnos`)
      .then(res => res.json());
  }
}
