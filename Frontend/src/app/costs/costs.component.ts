import { Component, OnInit } from '@angular/core';
import { Cost } from '../model/cost';
import { CostService } from '../service/cost.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
  animations: [
    trigger('showDetails', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CostsComponent implements OnInit {

  costs!: Cost[];
  dataSource!: any;
  displayedColumns: string[] = ['date', 'type','price','title','mileage'];
  expanded !: Cost | any;

  constructor(private costService: CostService) { }

  ngOnInit(): void {
    this.costService.getAllCosts().subscribe(
      data => {
        this.costs = data;
        this.dataSource = new MatTableDataSource(this.costs);
      }
    );
  }

  toggleRow(row: any) {
    if (this.expanded === row) {
      this.expanded = null
    } else {
      this.expanded = row
    }
  }
}
