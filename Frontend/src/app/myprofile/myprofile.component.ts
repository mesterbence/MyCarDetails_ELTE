import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  profileGroup!: FormGroup;
  userData!: User;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.getSelfUser().subscribe(
      data => {
        this.userData = data;
        this.profileGroup = this.formBuilder.group({
          username: [this.userData.username],
          password: [''],
          password2: [''],
          email: [this.userData.email]
        })
        this.profileGroup.controls['username'].disable();
      }
    )
  }

  onSubmit() {
    if (this.profileGroup.get('password')?.value !== "") {
      if (this.profileGroup.get('password2')?.value !== this.profileGroup.get('password')?.value) {
        this.snackBar.open("A két jelszó nem egyezik!", 'Bezárás', { verticalPosition: 'top', duration: 3000 });
      } else {
        this.authService.changePass(this.profileGroup.get('password')?.value).subscribe(
          data => {
            this.snackBar.open("Sikeres módosítás!", 'Bezárás', { verticalPosition: 'top', duration: 3000 });
            this.profileGroup.get('password')?.setValue("");
            this.profileGroup.get('password2')?.setValue("");
          }
        );
      }
    }
    if (this.profileGroup.get('email')?.value !== "") {
      if (this.profileGroup.get('email')?.value !== this.userData.email) {
        this.authService.changeMail(this.profileGroup.get('email')?.value).subscribe(
          data => {
            this.userData.email = this.profileGroup.get('email')?.value;
            this.snackBar.open("Sikeres módosítás!", 'Bezárás', { verticalPosition: 'top', duration: 3000 });
          }
        )
      }
    } else {
      this.snackBar.open("Az e-mail cím mező nem lehet üres!", 'Bezárás', { verticalPosition: 'top', duration: 3000 });
    }
  }
}
