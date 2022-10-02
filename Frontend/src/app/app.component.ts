import { Component } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mycardetails';

  closeResult = '';

  constructor(private offcanvasService: NgbOffcanvas) {}

  open(content: any) {
    this.offcanvasService.open(content);
  }
}
