import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Cost} from '../model/cost';
import {CostService} from '../service/cost.service';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelingCostResult} from "../model/fueling-cost-result";
import {DatePipe, DecimalPipe} from "@angular/common";
import Utils from "../helpers/utils";
import {MatPaginator} from "@angular/material/paginator";
import {Service} from "../model/service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CosttypeService} from "../service/costtype.service";
import {CostType} from "../model/costtype";
import {CardetailsComponent} from "../cardetails/cardetails.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    displayedColumns: string[] = ['date', 'type', 'price', 'title', 'mileage', 'expandable'];
    expanded!: Cost | any;
    breakpoint !: number;
    carId!: number;
    fuelingData!: FuelingCostResult | undefined;
    decimalPipe = new DecimalPipe('en-US');
    editCostGroup!: FormGroup;
    costTypes!: CostType[];
    enabledCostTypes!: CostType[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;


    constructor(@Inject(CardetailsComponent) private carDetails: CardetailsComponent,
                private costService: CostService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private datePipe: DatePipe,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private costTypeService: CosttypeService,
                private snackBar: MatSnackBar) {
    }

    getNum = Utils.getNum;
    numberOnly = Utils.numberOnly;
    numberOnlyWithComma = Utils.numberOnlyWithComma;

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.carId = Number(params.get('id'));
                this.loadCosts();
            } else {
                this.router.navigate(['/mycars']);
            }
            this.costTypeService.getAllCostTypes().subscribe(
                data => {
                    this.costTypes = data;
                }
            );
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

    clickedCost(cost: Cost, content: any) {
        this.enabledCostTypes = [];
        if (cost.type.name === "üzemanyag") {
            this.costTypes.forEach((type) => {
                if (type.name === "üzemanyag") {
                    this.enabledCostTypes.push(type);
                }
            });
            this.editCostGroup = this.formBuilder.group({
                id: cost.id,
                costtype: cost.type,
                price: cost.price,
                mileage: cost.mileage,
                title: cost.title,
                date: cost.date,
                note: cost.note,
                fueling_type: cost.fueling.type,
                fueling_quantity: cost.fueling.quantity,
                fueling_isPremium: cost.fueling.isPremium,
                fueling_isFull: cost.fueling.isFull,
            });
        } else {
            this.costTypes.forEach((type) => {
                if (type.name !== "üzemanyag") {
                    this.enabledCostTypes.push(type);
                }
            });
            this.editCostGroup = this.formBuilder.group({
                id: cost.id,
                costtype: cost.type,
                price: cost.price,
                mileage: cost.mileage,
                title: cost.title,
                date: cost.date,
                note: cost.note,
            });
        }
        const type = this.costTypes.find(f => f.id == cost.type.id);
        this.editCostGroup.get('costtype')?.setValue(type);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    onSubmit() {
        if (this.editCostGroup.get('date')?.value !== "" && this.editCostGroup.get('costtype')?.value !== "") {
            if (this.editCostGroup.get('costtype')?.value.name === "üzemanyag") {
                this.costService.editCostWithFueling(
                    this.carId,
                    this.editCostGroup.get('costtype')?.value,
                    this.editCostGroup.get('price')?.value,
                    this.editCostGroup.get('mileage')?.value,
                    this.editCostGroup.get('title')?.value,
                    this.editCostGroup.get('date')?.value,
                    this.editCostGroup.get('note')?.value,
                    this.editCostGroup.get('fueling_type')?.value,
                    this.editCostGroup.get('fueling_quantity')?.value.replace(',', '.'),
                    this.editCostGroup.get('fueling_isPremium')?.value,
                    this.editCostGroup.get('fueling_isFull')?.value,
                    this.editCostGroup.get('id')?.value
                ).subscribe((data) => {
                    this.loadCosts();
                    this.carDetails?.loadCarStat(this.carId);
                })
            } else {
                this.costService.editCost(
                    this.carId,
                    this.editCostGroup.get('costtype')?.value,
                    this.editCostGroup.get('price')?.value,
                    this.editCostGroup.get('mileage')?.value,
                    this.editCostGroup.get('title')?.value,
                    this.editCostGroup.get('date')?.value,
                    this.editCostGroup.get('note')?.value,
                    this.editCostGroup.get('id')?.value
                ).subscribe((data) => {
                    this.loadCosts();
                    this.carDetails?.loadCarStat(this.carId);
                })
            }
            this.modalService.dismissAll();
        } else {
            this.snackBar.open("A mezők kitöltése kötelező!", 'Bezárás', {verticalPosition: 'top', duration: 5000});
        }
    }
}
