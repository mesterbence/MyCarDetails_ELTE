import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      password2: ['']
    })
  }

  onLoginSubmit() {
    if(this.loginForm.get('username')?.value !== "" && this.loginForm.get('password')?.value !== "") {
      this.authService.authenticate(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value);
      this.loginForm.get('username')?.setValue("");
      this.loginForm.get('password')?.setValue("");
    } else {
      this.snackBar.open("A mezők kitöltése kötelező!", 'Bezárás', { verticalPosition: 'top', duration: 3000 });
    }
  }
  onRegisterSubmit() {
    this.authService.register(this.registerForm.get('username')?.value,this.registerForm.get('email')?.value,this.registerForm.get('password')?.value);
  }
}
