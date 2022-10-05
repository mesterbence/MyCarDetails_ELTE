import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { CostsComponent } from './costs/costs.component';
import { MycarsComponent } from './mycars/mycars.component';
import { NewcarComponent } from './newcar/newcar.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'costs', component: CostsComponent },
  { path: 'login', component: RegisterComponent },
  { path: 'mycars', component: MycarsComponent },
  { path: 'cardetails/:id', component: CardetailsComponent },
  { path: 'newcar', component: NewcarComponent },

  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
