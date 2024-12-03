import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public localDate !: string

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getConversion(countryCode: string){
    const currentDate = new Date()
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1)
    this.localDate = this.datePipe.transform(yesterdayDate, 'yyyy-MM-dd') ?? 'unknown'
    // console.log(this.localDate);
    
    return this.http.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${this.localDate}/v1/currencies/${countryCode}.json`)
  }
}
