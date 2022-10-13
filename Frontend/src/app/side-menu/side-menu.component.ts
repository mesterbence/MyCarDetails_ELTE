import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user';
import { UserRole } from '../model/userrole';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  protected userData!: User;
  protected isAdmin: boolean = false;

  constructor(private offcanvasService: NgbOffcanvas,
    protected authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.hasToken()) {
      this.authService.getSelfUser().subscribe(
        data => {
          this.userData = data;
          this.isAdmin = (this.userData.role === UserRole.ADMIN);
          console.log(this.isAdmin)
          console.log(this.userData);
          console.log(UserRole.USER);
        }
      );
    }
  }

  open(content: any) {
    this.offcanvasService.open(content);
  }
}
