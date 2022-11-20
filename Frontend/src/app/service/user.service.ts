import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${environment.baseUrl}/user/users`);
    }
}
