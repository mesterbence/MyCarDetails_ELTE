import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserRole } from '../model/userrole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }


  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(environment.baseUrl + "/user/login", { username, password })
      .subscribe((data) => {
        //this.cookieService.set('token', data.token);
        //this.cookieService.set('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        this.router.navigate(['/mycars']);
      });
  }
  register(username: string, email: string, password: string) {
    return this.httpClient.post<any>(environment.baseUrl + "/user/create", { username, email, password })
      .subscribe((data) => {
        this.authenticate(username, password);
      });
  }

  getSelfUser() {
    return this.httpClient.get<User>(`${environment.baseUrl}/user/me`);
  }
  isAdmin(): boolean {
    //return JSON.parse(this.cookieService.get('user')).role === UserRole.ADMIN;
    return JSON.parse(localStorage.getItem('user')!).role === UserRole.ADMIN;
  }

  hasToken(): boolean {
    //return this.cookieService.check('token');
    return localStorage.getItem('token') !== null;
  }

  getToken(): String {
    //return this.cookieService.get('token');
    return localStorage.getItem('token')!;
  }
  getUser(): User {
    //return this.cookieService.get('token');
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout(): void {
    // this.cookieService.delete('token');
    // this.cookieService.delete('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  changePass(password: String) {
    return this.httpClient.post<any>(environment.baseUrl + "/user/changePass", password);
  }
  changeMail(mail: String) {
    return this.httpClient.post<any>(environment.baseUrl + "/user/changeMail", mail);
  }
}
