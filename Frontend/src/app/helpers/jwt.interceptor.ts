import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.hasToken()) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
            });
        }
        return next.handle(request).pipe(
            catchError((err: any) => {
                return throwError(() => {
                    new Error(err.error.message);
                    console.log(err)
                    this.snackBar.open(err.error.message, 'Bezárás', { verticalPosition: 'top', duration: 5000 });
                })
            })
        );
    }
}