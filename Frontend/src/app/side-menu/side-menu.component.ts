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
  }

  open(content: any) {
    this.offcanvasService.open(content);
  }
}
