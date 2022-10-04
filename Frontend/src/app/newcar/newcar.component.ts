import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuelType } from '../model/fueltype';
import { FueltypeService } from '../service/fueltype.service';

@Component({
  selector: 'app-newcar',
  templateUrl: './newcar.component.html',
  styleUrls: ['./newcar.component.css']
})
export class NewcarComponent implements OnInit {

  fuelTypes!: FuelType[];
  newCarForm!: FormGroup;

  constructor(private fuelTypeService: FueltypeService, private formBuilder: FormBuilder) { }

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

  }
}
