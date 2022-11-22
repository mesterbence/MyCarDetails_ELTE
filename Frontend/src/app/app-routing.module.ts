import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardetailsComponent} from './cardetails/cardetails.component';
import {CostsComponent} from './costs/costs.component';
import {MorestatComponent} from './morestat/morestat.component';
import {MycarsComponent} from './mycars/mycars.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {NewcarComponent} from './newcar/newcar.component';
import {RegisterComponent} from './register/register.component';
import {ServicelistComponent} from "./servicelist/servicelist.component";
import {AdminUsersComponent} from "./admin/admin-users/admin-users.component";
import {AdminCarsComponent} from "./admin/admin-cars/admin-cars.component";

const routes: Routes = [
    {path: 'costs', component: CostsComponent},
    {path: 'login', component: RegisterComponent},
    {path: 'mycars', component: MycarsComponent},
    {path: 'cardetails/:id', component: CardetailsComponent},
    {path: 'newcar', component: NewcarComponent},
    {path: 'myprofile', component: MyprofileComponent},
    {path: 'morestat/:id', component: MorestatComponent},
    {path: 'admin/users', component: AdminUsersComponent},
    {path: 'admin/cars', component: AdminCarsComponent},
    {path: 'admin', component: AdminUsersComponent},
    {path: 'services/:id', component: ServicelistComponent},
    {path: '', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
