import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cost } from '../model/cost';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-morestat',
  templateUrl: './morestat.component.html',
  styleUrls: ['./morestat.component.css']
})
export class MorestatComponent implements OnInit {

  fuelings!: Cost[];
  carId!: number;

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.carId = Number(params.get('id'));
        this.carService.getCarFuelings(this.carId).subscribe(
          data => {
            this.fuelings = data;
            console.log(this.fuelings)
          }
        );
      } else {
        this.router.navigate(['/mycars']);
      }
    });
  }
}
