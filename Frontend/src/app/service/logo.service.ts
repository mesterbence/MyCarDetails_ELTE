import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  constructor() { }
  logoUrl: String = "./assets/images/brand-logos/"

  getBrandUrl(brand:String) : String {
    return this.logoUrl + brand.toLowerCase().replace(' ', '-') + ".png";
  }
}
