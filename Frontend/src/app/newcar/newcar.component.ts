import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuelType } from '../model/fueltype';
import { CarService } from '../service/car.service';
import { FueltypeService } from '../service/fueltype.service';

@Component({
  selector: 'app-newcar',
  templateUrl: './newcar.component.html',
  styleUrls: ['./newcar.component.css']
})
export class NewcarComponent implements OnInit {

  fuelTypes!: FuelType[];
  newCarForm!: FormGroup;

  constructor(private fuelTypeService: FueltypeService,
    private formBuilder: FormBuilder,
    private carService: CarService) { }

  ngOnInit(): void {
    this.newCarForm = this.formBuilder.group({
      brand: [''],
      model: [''],
      fuel: [''],
      numberplate: ['']
    })

    this.fuelTypeService.getAllFuelTypes().subscribe(
      data => {
        this.fuelTypes = data;
      }
    );
  }
  onSubmit() {
    this.carService.create(this.newCarForm.get('numberplate')?.value,this.newCarForm.get('brand')?.value,this.newCarForm.get('model')?.value,this.newCarForm.get('fuel')?.value); // típust bevezetni
  }
}
