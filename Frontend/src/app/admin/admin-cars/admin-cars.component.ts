import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {MatTableDataSource} from "@angular/material/table";
import {CarService} from "../../service/car.service";
import {Car} from "../../model/car";
import {Router} from "@angular/router";

@Component({
    selector: 'app-admin-cars',
    templateUrl: './admin-cars.component.html',
    styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

    constructor(private carService: CarService,
                private router: Router) {
    }

    cars!: Car[];
    dataSource!: any;
    displayedColumns: string[] = ['id', 'numberplate', 'owner', 'brand','model','fueltype'];

    ngOnInit(): void {
        this.carService.getAllCars().subscribe(data => {
            this.cars = data;
            console.log(data)
            this.dataSource = new MatTableDataSource(this.cars);
        })
    }

    openDetails(id : number) {
        this.router.navigate(['/cardetails', id]);
    }

}
