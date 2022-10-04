import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit {

  cars!: Car[];

  constructor(private carService: CarService,
    private router: Router) { }

  ngOnInit(): void {
    this.carService.getAllOwnCars().subscribe(
      data => {
        this.cars = data;
        if(this.cars.length === 0) {
          this.router.navigate(['/newcar']);
        }
      }
    );

  }

}
