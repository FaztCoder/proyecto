import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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

  getAlumnos() {
    // return this.http.get(`${url}/api/alumnos`);
    return this.http.get(this.url+'/api/alumnos' , {headers: this.headersT});
  }
}
