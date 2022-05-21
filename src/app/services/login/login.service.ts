import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AlumnoModel } from 'src/app/Models/AlumnoModel';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  alumnos: AlumnoModel[] = [];

  constructor(private http: HttpClient, public router: Router) { }
  // Sign-up (inicia sesion consumiendo el servicio de alumno)
  signUp(alumno: any): Observable<any> {
    let api = `${this.endpoint}/login`;
    return this.http.post(api, alumno).pipe(catchError(this.handleError));
  }
  // Sign-in (iniciar sesion con local storage)
  signIn(alumno: any) {
    return this.http
      .post<any>(`${this.endpoint}/login`, alumno)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getAlumno(res.id_alumno).subscribe((res) => {
          this.alumnos = res;
          this.router.navigate(['dashboard' + res.msg._id]);
        });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }
  // Alumno profile
  getAlumno(id: any): Observable<any> {
    let api = `${this.endpoint}/api/alumnos/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
