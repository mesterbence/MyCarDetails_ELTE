import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostType } from '../model/costtype';

@Injectable({
  providedIn: 'root'
})
export class CosttypeService {

  constructor(private httpClient: HttpClient) { }

  getAllCostTypes(): Observable<CostType[]> {
    return this.httpClient.get<CostType[]>(`${environment.baseUrl}/cost/types`);
  }
}
