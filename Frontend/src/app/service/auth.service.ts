import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService) { }


    async authenticate(username:string, password:string){

      return this.httpClient.post<any>(environment.baseUrl + "/user/login", { username, password })
      .subscribe((data) => {
        this.cookieService.set('token', data.token);
        this.router.navigate(['/mycars']);
      });
    }
    async register(username:string, email:string, password:string){
      return this.httpClient.post<any>(environment.baseUrl + "/user/create", { username, email, password })
      .subscribe((data) => {
        console.log(data)
        this.authenticate(username,password);
      });
    }

    hasToken(): boolean {
      return this.cookieService.check('token');
    }

    getToken(): String {
      return this.cookieService.get('token');
    }

    logout(): void {
      this.cookieService.delete('token');
      this.router.navigate(['/']);
    }
}
