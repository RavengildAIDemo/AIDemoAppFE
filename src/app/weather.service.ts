import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherData {
  // Define properties you want to access from the response
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'e423221a1039601afac724ae8b6dc244'; // Replace with your actual key
  baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?q=${location}&appid=${this.apiKey}`;
    return this.http.get<WeatherData>(url);
  }
}
