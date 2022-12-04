import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cost} from '../model/cost';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CostType} from '../model/costtype';
import {FuelingCostResult} from "../model/fueling-cost-result";

@Injectable({
    providedIn: 'root'
})
export class CostService {

    constructor(private httpClient: HttpClient) {
    }

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

    saveCostWithFueling(carId: number, costtype: CostType, price: number, mileage: number, title: String, date: String, note: String, fueling_type: String, fueling_quantity: number, fueling_isPremium: boolean, fueling_isFull: boolean) {
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
                    "isPremium": fueling_isPremium,
                    "isFull": fueling_isFull
                }
            });
    }
    editCost(carId: number, costtype: CostType, price: number, mileage: number, title: String, date: String, note: String, id:number) {
        return this.httpClient.post<any>(environment.baseUrl + `/cost/edit/${carId}`,
            {
                "id": id,
                "type": costtype,
                "price": price,
                "mileage": mileage,
                "note": note,
                "date": date,
                "title": title,
                "fueling": null
            });
    }

    editCostWithFueling(carId: number, costtype: CostType, price: number, mileage: number, title: String, date: String, note: String, fueling_type: String, fueling_quantity: number, fueling_isPremium: boolean, fueling_isFull: boolean, id:number) {
        return this.httpClient.post<any>(environment.baseUrl + `/cost/edit/${carId}`,
            {
                "id": id,
                "type": costtype,
                "price": price,
                "mileage": mileage,
                "note": note,
                "date": date,
                "title": title,
                "fueling": {
                    "quantity": fueling_quantity,
                    "type": fueling_type,
                    "isPremium": fueling_isPremium,
                    "isFull": fueling_isFull
                }
            });
    }

    getLastThreeFueling(carId: number, date: String, mileage: number): Observable<FuelingCostResult> {
        return this.httpClient.get<FuelingCostResult>(`${environment.baseUrl}/cost/fueling/${carId}/${date}/${mileage}`);
    }

    deleteCost(costId: number) {
        return this.httpClient.delete(`${environment.baseUrl}/cost/delete/${costId}`);
    }
}
