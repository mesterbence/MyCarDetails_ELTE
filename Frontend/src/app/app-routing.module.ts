import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsComponent } from './costs/costs.component';
import { MycarsComponent } from './mycars/mycars.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'costs', component: CostsComponent },
  { path: 'login', component: RegisterComponent },
  { path: 'mycars', component: MycarsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
