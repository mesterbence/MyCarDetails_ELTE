import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from '../model/car';
import {CarService} from '../service/car.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CostType} from '../model/costtype';
import {CosttypeService} from '../service/costtype.service';
import {CostService} from '../service/cost.service';
import {FuelType} from '../model/fueltype';
import {FueltypeService} from '../service/fueltype.service';
import {Carstatistic} from '../model/carstatistic';
import {CostsComponent} from '../costs/costs.component';
import {ServiceService} from "../service/service.service";
import Utils from "../helpers/utils";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./dialog/delete-dialog/delete-dialog.component";
import {Service} from "../model/service";
import {DatePipe} from "@angular/common";
import {ServiceSummary} from "../model/service-summary";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-cardetails',
    templateUrl: './cardetails.component.html',
    styleUrls: ['./cardetails.component.css'],
    providers: [DatePipe]
})
export class CardetailsComponent implements OnInit {

    @ViewChild(CostsComponent) costs: CostsComponent | undefined;

    carId!: number;
    carData!: Car;
    newCostGroup!: FormGroup;
    modifyCarGroup!: FormGroup;
    serviceGroup!: FormGroup;
    costTypes!: CostType[];
    fuelTypes!: FuelType[];
    carStat!: Carstatistic;
    delCarNumberPlate!: String;
    nextMOT: Service = new Service();
    serviceSummary!: ServiceSummary;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private carService: CarService,
                private costService: CostService,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private costTypeService: CosttypeService,
                private fuelTypeService: FueltypeService,
                private serviceService: ServiceService,
                private dialog: MatDialog,
                private datePipe: DatePipe,
                private snackBar: MatSnackBar) {
    }

    getNum = Utils.getNum;
    numberOnly = Utils.numberOnly;
    numberOnlyWithComma = Utils.numberOnlyWithComma;
    getDate = Utils.getDate;

    ngOnInit(): void {

        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.costTypeService.getAllCostTypes().subscribe(
                    data => {
                        this.costTypes = data;
                    }
                );
                this.carId = Number(params.get('id'));
                this.carService.getCarById(this.carId).subscribe(
                    data => {
                        this.carData = data;
                    }
                );
                this.fuelTypeService.getAllFuelTypes().subscribe(
                    data => {
                        this.fuelTypes = data;
                    }
                );
                this.serviceService.findNextMOT(this.carId).subscribe(
                    data => {
                        this.nextMOT = data;
                    }
                )
                this.loadCarStat(this.carId);
            } else {
                this.router.navigate(['/mycars']);
            }
        });
        this.initNewCostGroup();
        this.serviceGroup = this.formBuilder.group({
            date: [''],
            mileage: null,
            note: [''],
        });
        this.carService.getServiceSumByCarId(this.carId).subscribe(
            data => {
                this.serviceSummary = data;
            }
        );
    }

    onSubmit() {
        if (this.newCostGroup.get('date')?.value !== "" && this.newCostGroup.get('costtype')?.value !== "") {
            this.newCostGroup.get('fueling_quantity')?.setValue(this.newCostGroup.get('fueling_quantity')?.value.replace(',', '.'));
            if (this.newCostGroup.get('costtype')?.value.name === "üzemanyag") {
                this.costService.saveCostWithFueling(
                    this.carId,
                    this.newCostGroup.get('costtype')?.value,
                    this.newCostGroup.get('price')?.value,
                    this.newCostGroup.get('mileage')?.value,
                    this.newCostGroup.get('title')?.value,
                    this.newCostGroup.get('date')?.value,
                    this.newCostGroup.get('note')?.value,
                    this.newCostGroup.get('fueling_type')?.value,
                    this.newCostGroup.get('fueling_quantity')?.value,
                    this.newCostGroup.get('fueling_isPremium')?.value,
                    this.newCostGroup.get('fueling_isFull')?.value
                ).subscribe((data) => {
                    this.costs?.addCost(data);
                    this.loadCarStat(this.carId);
                    this.initNewCostGroup();
                })
            } else {
                this.costService.saveCost(
                    this.carId,
                    this.newCostGroup.get('costtype')?.value,
                    this.newCostGroup.get('price')?.value,
                    this.newCostGroup.get('mileage')?.value,
                    this.newCostGroup.get('title')?.value,
                    this.newCostGroup.get('date')?.value,
                    this.newCostGroup.get('note')?.value
                ).subscribe((data) => {
                    this.costs?.addCost(data);
                    this.loadCarStat(this.carId);
                    this.initNewCostGroup();
                })
            }
            this.modalService.dismissAll();
        } else {
            this.snackBar.open("A mezők kitöltése kötelező!", 'Bezárás', {verticalPosition: 'top', duration: 5000});
        }
    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    openModify(content: any) {
        this.costs?.loadCosts()
        this.modifyCarGroup = this.formBuilder.group({
            numberplate: [this.carData.numberplate],
            brand: [this.carData.brand],
            model: [this.carData.model],
            fuelType: [this.carData.fuelType],
        });
        const fuel = this.fuelTypes.find(f => f.id == this.carData.fuelType.id);
        this.modifyCarGroup.get('fuelType')?.setValue(fuel);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }


    onModifySubmit() {
        if (this.modifyCarGroup.get("brand")?.value !== "" &&
            this.modifyCarGroup.get("model")?.value !== "" &&
            this.modifyCarGroup.get("fuel")?.value !== "" &&
            this.modifyCarGroup.get("numberplate")?.value !== "") {
            this.carService.modify(this.modifyCarGroup.get('numberplate')?.value, this.modifyCarGroup.get('brand')?.value, this.modifyCarGroup.get('model')?.value, this.modifyCarGroup.get('fuelType')?.value, this.carId)
                .subscribe((data: Car) => this.carData = data);
            this.modalService.dismissAll();
        } else {
            this.snackBar.open("A mezők kitöltése kötelező!", 'Bezárás', {verticalPosition: 'top', duration: 5000});
        }
    }

    onServiceSubmit() {
        if (this.serviceGroup.get('note')?.value !== "" &&
            ((this.serviceGroup.get('date')?.value !== "" && this.serviceGroup.get('date')?.value !== null) || (this.serviceGroup.get('mileage')?.value !== "" && this.serviceGroup.get('mileage')?.value !== null))) {
            this.serviceService.createService(this.serviceGroup.value, this.carId).subscribe((data) => {
                this.modalService.dismissAll();
                this.router.navigate(['/services', this.carId]);
            });
        } else {
            this.snackBar.open("A megjegyzés mező, és a dátum vagy kilométeróra mező kitöltése kötelező!", 'Bezárás', {
                verticalPosition: 'top',
                duration: 5000
            });
        }
    }

    openDeleteCar(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: this.delCarNumberPlate
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.delCarNumberPlate = result;
                if (this.delCarNumberPlate === this.carData.numberplate) {
                    this.carService.deleteCar(this.carData.id).subscribe(data => this.router.navigate(['/mycars']));
                } else {
                    this.delCarNumberPlate = "";
                    this.snackBar.open("A rendszám nem megfelelő!", 'Bezárás', {
                        verticalPosition: 'top',
                        duration: 5000
                    });
                }
            }

        });
    }

    loadCarStat(carId: number) {
        this.carService.getCarStat(carId).subscribe(
            data => {
                this.carStat = data;
            }
        );
    }

    initNewCostGroup() {
        this.newCostGroup = this.formBuilder.group({
            costtype: [''],
            price: [''],
            mileage: [''],
            title: [''],
            date: [''],
            note: [''],
            fueling_type: [''],
            fueling_quantity: [''],
            fueling_isPremium: [''],
            fueling_isFull: [''],
        });
    }

    getBadgeValue(carId: number) {
        if (this.serviceSummary) {
            return this.serviceSummary.serviceSum;
        }
        return 0;
    }
}