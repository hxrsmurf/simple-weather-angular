import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IpserviceService } from './ipservice.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  stringify: string = ''
  env = environment;
  constructor(
    private http: HttpClient,
    private ip: IpserviceService
  ) { }

  ngOnInit(): void {
  }

  manualWeather(zipcode: string) {
    let api = this.env.weather.key;
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${api}&units=imperial`
    return this.http.get(url)
  }

  //weatherGov(lat: string, long: string){
  weatherGov(lat: string, long: string) {
    let url = `https://api.weather.gov/points/${lat},${long}`;
    return this.http.get(url)
  }

  weatherForecast(url: string){
    return this.http.get(url)
  }

  getWeatherZip() {
    this.ip.getIPAddress().subscribe((res: any) => {
      let zip = res.zip_code;
      let api = this.env.weather.key;
      let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api}&units=imperial`;
      let result = this.http.get(url);
      result.subscribe((res: any) => {
        this.stringify = JSON.stringify(res)
      })
    })
  }
}