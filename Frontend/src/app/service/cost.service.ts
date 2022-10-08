import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cost } from '../model/cost';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostType } from '../model/costtype';
import { Fueling } from '../model/fueling';

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

  saveCost(carId: number, costtype: CostType, price: number, mileage: number, title: String, date: String, note: String) {
    return this.httpClient.post<any>(environment.baseUrl + `/cost/create/${carId}`,
      {
        "type": costtype,
        "price": price,
        "mileage": mileage,
        "note": note,
        "date": date,
        "title": title,
        "fueling": null
      });
  }

  saveCostWithFueling(carId: number, costtype: CostType, price: number, mileage: number, title: String, date: String, note: String, fueling_type: String, fueling_quantity: number, fueling_isPremium: boolean) {
    return this.httpClient.post<any>(environment.baseUrl + `/cost/create/${carId}`,
      {
        "type": costtype,
        "price": price,
        "mileage": mileage,
        "note": note,
        "date": date,
        "title": title,
        "fueling": {
          "quantity": fueling_quantity,
          "type": fueling_type,
          "isPremium": fueling_isPremium
        }
      });
  }
}
