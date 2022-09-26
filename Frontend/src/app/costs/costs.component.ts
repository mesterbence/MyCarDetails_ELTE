import { Component, OnInit } from '@angular/core';
import { Cost } from '../model/cost';
import { CostService } from '../service/cost.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {

  costs!: Cost[];
  dataSource!: any;
  displayedColumns: string[] = ['date','type','title','price','mileage'];

  constructor(private costService: CostService) { }

  ngOnInit(): void {
    this.costService.getAllCosts().subscribe(
      data => {
        this.costs = data;
        this.dataSource = new MatTableDataSource(this.costs);
      }
    );
    console.log(this.costs)
  }

}
