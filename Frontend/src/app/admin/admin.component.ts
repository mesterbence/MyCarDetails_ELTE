import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserRole } from '../model/userrole';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user!: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getSelfUser().subscribe(
      user => {
        this.user = user;
        if(this.user.role !== UserRole.ADMIN) this.authService.logout();
      }
    )
  }

}
