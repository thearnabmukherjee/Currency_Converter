import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryList } from './countryList';

@Injectable({
  providedIn: 'root'
})
export class FlagServiceService {

  public countries = CountryList

  constructor(private http: HttpClient) { }
  
  getCountry(){
    return Object.keys(this.countries).map(key => ({ code: key, name: this.countries[key] }))
  }

}
