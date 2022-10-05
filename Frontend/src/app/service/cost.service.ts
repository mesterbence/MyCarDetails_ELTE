import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cost } from '../model/cost';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  constructor(private httpClient: HttpClient) { }

  getAllCosts(): Observable<Cost[]> {
    return this.httpClient.get<Cost[]>(`${environment.baseUrl}/cost/costs`);
  }
  getAllCostsById(carId: number): Observable<Cost[]> {
    return this.httpClient.get<Cost[]>(`${environment.baseUrl}/cost/bycar/${carId}`);
  }
}
