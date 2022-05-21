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

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ingresar(): any {
    // console.log(this.form);
    // const usuario = this.form.value.username;
    // const password = this.form.value.password;

    // if (usuario === usuario && password === password) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this._snackBar.open('Usuario o contraseña incorrectos', '', {
    //     duration: 2000,
    //   });
    // }
    this.authService.signUp(this.form.value).subscribe(
      (res) => {
        console.log(res);
        this.cookieService.set('access_token', res.token, 1, '/'); //guarda el token en cookie por un día y el "/" es para que se pueda acceder a todas las rutas
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
