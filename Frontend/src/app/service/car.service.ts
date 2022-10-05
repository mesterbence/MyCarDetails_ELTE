import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../model/car';
import { FuelType } from '../model/fueltype';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  getAllOwnCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${environment.baseUrl}/car/own`);
  }

  async create(numberplate:string, brand:string, model:string, fuelType:FuelType){
    return this.httpClient.post<any>(environment.baseUrl + "/car/create", { numberplate, brand, model, fuelType })
    .subscribe((data) => {
      this.router.navigate(['/mycars']);
    });
  }
}
