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
  city: string = '';
  temp: string = '';
  realFeal: string = '';

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
      this.weather.manualWeather(res.zip_code).subscribe((res: any) => {
        this.temp = res.main.temp
        this.realFeal = res.main.feels_like
      })
    })
  }
}
