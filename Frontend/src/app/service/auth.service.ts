import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }


    async authenticate(username:string, password:string){

      return this.httpClient.post<any>(environment.baseUrl + "/user/login", { username, password })
      .subscribe((data) => {
        console.log(data)
      });

    }
}
