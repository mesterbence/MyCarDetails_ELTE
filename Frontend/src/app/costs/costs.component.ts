import { Component, OnInit } from '@angular/core';
import { Cost } from '../model/cost';
import { CostService } from '../service/cost.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {

  costs!: Cost[];

  constructor(private costService: CostService) { }

  ngOnInit(): void {
    this.costService.getAllCosts().subscribe(
      data => {
        this.costs = data;
        console.log(data)
      }
    );
  }

}
