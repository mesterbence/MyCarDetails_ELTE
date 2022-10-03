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

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  onSubmit() {
    console.log(this.loginForm.get('username')?.value)
    console.log(this.loginForm.get('password')?.value)
    this.authService.authenticate(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value);

    //this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      //(res) => console.log(res),
      //(err) => console.log(err)
    //);
  }
}
