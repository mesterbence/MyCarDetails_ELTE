import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit {

  cars!: Car[];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getAllOwnCars().subscribe(
      data => {
        this.cars = data;
      }
    );
  }

}
