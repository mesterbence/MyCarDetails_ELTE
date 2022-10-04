import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuelType } from '../model/fueltype';

@Injectable({
  providedIn: 'root'
})
export class FueltypeService {

  constructor(private httpClient: HttpClient) { }

  getAllFuelTypes(): Observable<FuelType[]> {
    return this.httpClient.get<FuelType[]>(`${environment.baseUrl}/fueltype/fueltypes`);
  }
}
