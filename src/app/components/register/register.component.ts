import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar, 
    private router: Router
  ) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const correo = this.form.value.correo;
    const password = this.form.value.password;
    const passwordConfirm = this.form.value.passwordConfirm;

    if (usuario == 'admin2' && correo == 'admin2@correo.com' && password == 'admin2' && passwordConfirm == 'admin2') {
      this.loadingState();
    } else {
      this.error();
      this.form.reset();
    }
  }

  error() {
    this._snackBar.open('Verifique los datos si con correctos', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  loadingState() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }


}
