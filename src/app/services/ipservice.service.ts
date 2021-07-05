import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpserviceService {
  constructor(private http: HttpClient) { }
  getIPAddress(){
    return this.http.get("https://freegeoip.app/json/")
  }
}