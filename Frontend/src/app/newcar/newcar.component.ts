import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuelType} from '../model/fueltype';
import {CarService} from '../service/car.service';
import {FueltypeService} from '../service/fueltype.service';
import {MatSnackBar} from "@angular/material/snack-bar";

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
                private carService: CarService,
                private snackBar: MatSnackBar) {
    }

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
        if (this.newCarForm.get("brand")?.value !== "" &&
            this.newCarForm.get("model")?.value !== "" &&
            this.newCarForm.get("fuel")?.value !== "" &&
            this.newCarForm.get("numberplate")?.value !== "") {
            this.carService.create(this.newCarForm.get('numberplate')?.value, this.newCarForm.get('brand')?.value, this.newCarForm.get('model')?.value, this.newCarForm.get('fuel')?.value);
        } else {
            this.snackBar.open("A mezők kitöltése kötelező!", 'Bezárás', {verticalPosition: 'top', duration: 5000});
        }
    }
}
