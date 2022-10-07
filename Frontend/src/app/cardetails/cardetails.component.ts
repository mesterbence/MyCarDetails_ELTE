import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';
import { NgbModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CostType } from '../model/costtype';
import { CosttypeService } from '../service/costtype.service';
import { CostService } from '../service/cost.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {

  carId!: number;
  carData!: Car;
  newCostGroup!: FormGroup;
  modifyCarGroup!: FormGroup;
  costTypes!: CostType[];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private costService: CostService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private costTypeService: CosttypeService) { }

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
      )
    } else {
      this.costService.saveCost(
        this.carId,
        this.newCostGroup.get('costtype')?.value,
        this.newCostGroup.get('price')?.value,
        this.newCostGroup.get('mileage')?.value,
        this.newCostGroup.get('title')?.value,
        this.newCostGroup.get('date')?.value,
        this.newCostGroup.get('note')?.value
      )

    }
    console.log(this.newCostGroup.get('costtype')?.value, this.newCostGroup.get('fueling_type')?.value, this.newCostGroup.get('fueling_quantity')?.value, this.newCostGroup.get('fueling_isPremium')?.value)
    console.log(this.newCostGroup.get('price')?.value, this.newCostGroup.get('mileage')?.value, this.newCostGroup.get('title')?.value, this.newCostGroup.get('date')?.value, this.newCostGroup.get('note')?.value);
    //this.carService.create(this.newCarForm.get('numberplate')?.value,this.newCarForm.get('brand')?.value,this.newCarForm.get('model')?.value,this.newCarForm.get('fuel')?.value); // típust bevezetni
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openModify(content:any) {
    this.modifyCarGroup = this.formBuilder.group({
      numberplate: [this.carData.numberplate],
      brand: [this.carData.brand],
      model: [this.carData.model],
      fuelType: [this.carData.fuelType],
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
