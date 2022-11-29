import {Component, OnInit, ViewChild} from '@angular/core';
import {Cost} from '../model/cost';
import {CostService} from '../service/cost.service';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelingCostResult} from "../model/fueling-cost-result";
import {DatePipe, DecimalPipe} from "@angular/common";
import Utils from "../helpers/utils";
import {MatPaginator} from "@angular/material/paginator";

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
    displayedColumns: string[] = ['date', 'type', 'price', 'title', 'mileage','expandable'];
    expanded!: Cost | any;
    breakpoint !: number;
    carId!: number;
    fuelingData!: FuelingCostResult | undefined;
    decimalPipe = new DecimalPipe('en-US');

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

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
        } else {
            this.expanded = row;
            let fuelings = this.costs.filter((cost) => cost.fueling !== null);
            if (row.fueling && fuelings.length >= 3) {
                this.getConsumptionData(row);
            }
        }
    }

    loadCosts() {
        this.costService.getAllCostsById(this.carId).subscribe(
            data => {
                this.costs = data;
                this.dataSource = new MatTableDataSource(this.costs);
                this.initPaginator();
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
    initPaginator() {
        this.paginator!.length = this.costs.length;
        this.paginator!._intl.itemsPerPageLabel = '';
        this.paginator!._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end > length ? length : end} / ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.paginator = this.paginator;
    }
}
