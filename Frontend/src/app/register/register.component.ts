import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private authService: AuthService) { }

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
    this.authService.authenticate(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value);
  }
  onRegisterSubmit() {
    this.authService.register(this.registerForm.get('username')?.value,this.registerForm.get('email')?.value,this.registerForm.get('password')?.value);
  }
}
