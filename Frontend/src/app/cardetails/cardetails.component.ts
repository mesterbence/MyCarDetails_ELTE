import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {

  carId!: number;
  carData!: Car;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.carId = Number(params.get('id'));
        this.carService.getCarById(this.carId).subscribe(
          data => {
            this.carData = data;
          }
        );
      } else {
        this.router.navigate(['/mycars']);
      }
    });
  }

}
