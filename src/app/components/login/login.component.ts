import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form: FormGroup;
  form: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ingresar(): any {
    const {username, password} = this.form.value
    this.authService.login(username, password).subscribe(
      (res) => {
         console.log(res);
      const {token} = res;
      const {name} = res;
      const {username} = res;
      const {rol_id} = res;
      this.cookieService.set('name',name);
      this.cookieService.set('username',username);
      this.cookieService.set('role',rol_id);
      //duracion del token de una hora
      this.cookieService.set('token',token,1/24);
      this.router.navigate(['/dashboard']);
      });
  //   this.authService.login().subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.cookieService.set('access_token', res.token, 1, '/'); //guarda el token en cookie por un día y el "/" es para que se pueda acceder a todas las rutas
  //       this.router.navigate(['/dashboard']);
  //     }
  //   );
  // }
}

}