import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private offcanvasService: NgbOffcanvas,
    protected authService: AuthService) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.offcanvasService.open(content);
  }
}
