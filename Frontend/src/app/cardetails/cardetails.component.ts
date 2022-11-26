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

@Component({
    selector: 'app-cardetails',
    templateUrl: './cardetails.component.html',
    styleUrls: ['./cardetails.component.css']
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

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private carService: CarService,
                private costService: CostService,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private costTypeService: CosttypeService,
                private fuelTypeService: FueltypeService,
                private serviceService: ServiceService,
                private dialog: MatDialog) {
    }

    getNum = Utils.getNum;
    numberOnly = Utils.numberOnly;

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
                this.loadCarStat(this.carId);
            } else {
                this.router.navigate(['/mycars']);
            }
        });
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
        this.serviceGroup = this.formBuilder.group({
            date: [''],
            mileage: null,
            note: [''],
        })
    }

    onSubmit() {
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
            })
        }
        this.modalService.dismissAll();
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
        this.carService.modify(this.modifyCarGroup.get('numberplate')?.value, this.modifyCarGroup.get('brand')?.value, this.modifyCarGroup.get('model')?.value, this.modifyCarGroup.get('fuelType')?.value, this.carId)
            .subscribe((data: Car) => this.carData = data);
        this.modalService.dismissAll();
    }

    onServiceSubmit() {
        this.serviceService.createService(this.serviceGroup.value, this.carId).subscribe((data) => console.log("xs"));
        console.log(this.serviceGroup.value)
    }

    openDeleteCar(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: this.delCarNumberPlate
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result !== undefined) {
                this.delCarNumberPlate = result;
                if(this.delCarNumberPlate === this.carData.numberplate) {
                    this.carService.deleteCar(this.carData.id).subscribe(data => this.router.navigate(['/mycars']));
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
}