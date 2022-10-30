import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CostType } from '../model/costtype';
import { UserRole } from '../model/userrole';
import { CosttypeService } from '../service/costtype.service';
import { CostService } from '../service/cost.service';
import { FuelType } from '../model/fueltype';
import { FueltypeService } from '../service/fueltype.service';
import { Carstatistic } from '../model/carstatistic';
import { CostsComponent } from '../costs/costs.component';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { _isNumberValue } from '@angular/cdk/coercion';

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
  costTypes!: CostType[];
  fuelTypes!: FuelType[];
  carStat!: Carstatistic;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private costService: CostService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private costTypeService: CosttypeService,
    private fuelTypeService: FueltypeService) { }

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
        this.carService.getCarStat(this.carId).subscribe(
          data => {
            this.carStat = data;
          }
        );
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
      fueling_isPremium: ['']
    });
  }
  onSubmit() {
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
        this.newCostGroup.get('fueling_isPremium')?.value
      ).subscribe((data) => {
        this.costs?.addCost(data);
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
      })
    }
    this.modalService.dismissAll();
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onModifySubmit() {
    this.carService.modify(this.modifyCarGroup.get('numberplate')?.value, this.modifyCarGroup.get('brand')?.value, this.modifyCarGroup.get('model')?.value, this.modifyCarGroup.get('fuelType')?.value, this.carId)
    .subscribe((data: Car) => this.carData = data);
    this.modalService.dismissAll();
  }
  getNum(num: number, unit: String) {
    if (num === null || isNaN(num)) { return "Még nincs adat"; }
    if( num % 1 !== 0) { 
      return (Math.round(num * 10**2) / 10**2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + unit;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + unit;
  }
}
