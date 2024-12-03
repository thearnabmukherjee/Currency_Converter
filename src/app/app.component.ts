import { Component, OnInit } from '@angular/core';
import { FlagServiceService } from './flag-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  public countries !: { code: string, name: string }[]
  public fromCountryFlag: string = ''
  public toCountryFlag: string = ''
  public conversionRate: string = ''

  constructor(private flagService: FlagServiceService, private fb: FormBuilder, private currencyService: CurrencyService){}

  countryForm = this.fb.group({
    fromCountry: ['USD'],
    toCountry: ['INR'],
    inputValue: [1, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]]
  })

  ngOnInit(): void {
    this.countries = this.flagService.getCountry()
    // console.log(this.countries); 
    this.onCountrySelect()  
    this.convertCurrency()
  }

  onCountrySelect(){
    let fromCountry = this.countryForm.value.fromCountry as string
    this.fromCountryFlag = this.getCountryFlag(fromCountry)

    let toCountry = this.countryForm.value.toCountry as string
    this.toCountryFlag = this.getCountryFlag(toCountry)
  }

  getCountryFlag(somecountry: string){
    let country = this.countries.filter((obj)=>obj.code===somecountry)
    // console.log(country[0].name);
    let countryName = country[0].name.toLowerCase()
    return `https://flagcdn.com/48x36/${countryName}.png`
  }

  convertCurrency(){
    let fromCountry = this.countryForm.value.fromCountry?.toLowerCase() as string
    let toCountry = this.countryForm.value.toCountry?.toLowerCase() as string
    let amount = this.countryForm.value.inputValue as number
    this.currencyService.getConversion(fromCountry).subscribe((res:any)=>{
      // console.log(res[fromCountry][toCountry]);
      if (res){
        let rate = (amount * res[fromCountry][toCountry]).toFixed(2)
        this.conversionRate = `${amount} ${fromCountry.toUpperCase()} = ${rate} ${toCountry.toUpperCase()}`
      }
    })
  }

}
