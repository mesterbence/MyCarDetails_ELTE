import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostsComponent } from './costs/costs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MycarsComponent } from './mycars/mycars.component';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { NewcarComponent } from './newcar/newcar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyprofileComponent } from './myprofile/myprofile.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MorestatComponent } from './morestat/morestat.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


@NgModule({
  declarations: [
    AppComponent,
    CostsComponent,
    RegisterComponent,
    SideMenuComponent,
    MycarsComponent,
    CardetailsComponent,
    NewcarComponent,
    MyprofileComponent,
    MorestatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatGridListModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
