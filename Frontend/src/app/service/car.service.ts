import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../model/car';
import { Carstatistic } from '../model/carstatistic';
import { Cost } from '../model/cost';
import { FuelType } from '../model/fueltype';
import { MileageStat } from '../model/mileage-stat';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  getAllOwnCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${environment.baseUrl}/car/own`);
  }
  getCarById(carId: number): Observable<Car> {
    return this.httpClient.get<Car>(`${environment.baseUrl}/car/get/${carId}`);
  }

  create(numberplate: string, brand: string, model: string, fuelType: FuelType) {
    return this.httpClient.post<any>(environment.baseUrl + "/car/create", { numberplate, brand, model, fuelType })
      .subscribe((data) => {
        this.router.navigate(['/mycars']);
      });
  }

  modify(numberplate: string, brand: string, model: string, fuelType: FuelType, carId: number) {
    return this.httpClient.post<any>(environment.baseUrl + `/car/modify/${carId}`, { numberplate, brand, model, fuelType });
  }
  getCarStat(carId: number): Observable<Carstatistic> {
    return this.httpClient.get<Carstatistic>(`${environment.baseUrl}/car/stat/${carId}`);
  }
  getCarMileages(carId: number): Observable<MileageStat[]> {
    return this.httpClient.get<MileageStat[]>(`${environment.baseUrl}/car/mileages/${carId}`);
  }
  getCarFuelings(carId: number): Observable<Cost[]> {
    return this.httpClient.get<Cost[]>(`${environment.baseUrl}/cost/fueling/${carId}`);
  }
}
