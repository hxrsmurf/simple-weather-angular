import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { IpserviceService } from './services/ipservice.service';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './components/weather/weather.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    IpserviceService,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }