import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpserviceService } from 'src/app/services/ipservice.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  ipAddress: string = '';
  zipcode: string = '';
  city: string = '';   
  latitude: string = '';
  longitude: string = '';

  // Open Weather
  temp: string = '';
  realFeal: string = '';

  // Gov. Weather
  currentGovWeather: string = '';
  weatherGovURL: string = ''; 

  constructor(
    private ip: IpserviceService,
    private weather: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeather()
  }

  getWeather() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.city = res.city;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      this.zipcode = res.zip_code

      // openweathermap.org
      this.weather.manualWeather(this.zipcode).subscribe((res: any) => {
        this.temp = res.main.temp
        this.realFeal = res.main.feels_like
      })

      // weather.gov
      this.weatherGovURL = `https://forecast.weather.gov/MapClick.php?lon=${this.longitude}&lat=${this.latitude}`
      this.weather.weatherGov(this.latitude, this.longitude).subscribe((res:any)=>{
        let forecastURL = res.properties.forecast
        this.weather.weatherForecast(forecastURL).subscribe((res:any)=>{
          let weatherPropertyPeriods = res.properties.periods
          this.currentGovWeather = weatherPropertyPeriods[0].temperature
        })
      })
    });
  }
}