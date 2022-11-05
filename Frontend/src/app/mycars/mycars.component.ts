import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../model/car';
import { ServiceSummary } from '../model/service-summary';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit {

  cars!: Car[];
  serviceSummary!: ServiceSummary[];

  constructor(private carService: CarService,
    private router: Router) { }

  ngOnInit(): void {
    this.carService.getAllOwnCars().subscribe(
      data => {
        this.cars = data;
        if (this.cars.length === 0) {
          this.router.navigate(['/newcar']);
        } else if (this.cars.length === 1) {
          this.router.navigate(['/cardetails', this.cars[0].id]);
        }
      }
    );
    this.carService.getServiceSum().subscribe(
      data => {
        this.serviceSummary = data;
      }
    );
  }
  getBadgeValue(carId: number) {
    if(this.serviceSummary) {
      return this.serviceSummary.find(service => service.carId === carId)!.serviceSum;
    }
    return 0;
  }
}
