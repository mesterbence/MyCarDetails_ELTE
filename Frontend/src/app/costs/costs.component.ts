import {Component, OnInit} from '@angular/core';
import {Cost} from '../model/cost';
import {CostService} from '../service/cost.service';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelingCostResult} from "../model/fueling-cost-result";
import {DatePipe} from "@angular/common";
import Utils from "../helpers/utils";

@Component({
    selector: 'app-costs',
    templateUrl: './costs.component.html',
    styleUrls: ['./costs.component.css'],
    providers: [DatePipe],
    animations: [
        trigger('showDetails', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CostsComponent implements OnInit {


    costs!: Cost[];
    dataSource!: any;
    displayedColumns: string[] = ['date', 'type', 'price', 'title', 'mileage'];
    expanded!: Cost | any;
    breakpoint !: number;
    carId!: number;
    fuelingData!: FuelingCostResult | undefined;

    constructor(private costService: CostService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private datePipe: DatePipe) {
    }

    getNum = Utils.getNum;

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.carId = Number(params.get('id'));
                this.loadCosts();
            } else {
                this.router.navigate(['/mycars']);
            }
        });
    }

    toggleRow(row: any) {
        this.fuelingData = undefined;
        if (this.expanded === row) {
            this.expanded = null;
            this.fuelingData = undefined;
            console.log(this.fuelingData)
        } else {
            this.expanded = row;
            if (row.fueling) {
                this.getConsumptionData(row);
            }
        }
    }

    loadCosts() {
        this.costService.getAllCostsById(this.carId).subscribe(
            data => {
                this.costs = data;
                this.dataSource = new MatTableDataSource(this.costs);
            }
        );
    }

    addCost(cost: Cost) {
        this.costs = [cost].concat(this.costs);
        this.dataSource = new MatTableDataSource(this.costs);
    }

    getConsumptionData(element: any) {
        if (element.car.id !== null && element.date !== null && element.mileage !== null) {
            this.costService.getLastThreeFueling(element.car.id, this.datePipe.transform(element.date, 'yyyy-MM-dd')!, element.mileage).subscribe(
                (data) => {
                    if (data !== null) {
                        this.fuelingData = data;
                    }
                }
            );
        }
    }

}
