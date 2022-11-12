import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../model/car";
import {environment} from "../../environments/environment";
import {Service} from "../model/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllServices(carId: any): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${environment.baseUrl}/services/${carId}`);
  }
}